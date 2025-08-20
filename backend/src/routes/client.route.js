import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { database } from '../dbconn/database.js';

const router = express.Router();

// GET /api/clients - Get all clients (admin only)
router.get('/', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        console.log('🏢 Fetching all clients for admin');
        
        const query = `
            SELECT 
                u.user_id,
                u.email,
                u.first_name,
                u.last_name,
                u.phone,
                u.city,
                u.country,
                u.is_active,
                u.created_at,
                c.company_name,
                c.company_registration,
                c.industry_type,
                c.contact_first_name,
                c.contact_last_name,
                c.contact_phone,
                c.fleet_size,
                c.client_tier,
                c.credit_rating,
                c.is_active_client,
                COUNT(j.job_id) as total_jobs_posted
            FROM users u
            JOIN clients c ON u.user_id = c.user_id
            LEFT JOIN jobs j ON u.user_id = j.client_id
            WHERE u.role = 'client'
            GROUP BY u.user_id, c.user_id
            ORDER BY u.created_at DESC
        `;
        
        const result = await database.query(query);
        
        console.log(`🏢 Found ${result.rows.length} clients`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching clients:', error);
        res.status(500).json({ 
            error: 'Failed to fetch clients',
            details: error.message 
        });
    }
});

// GET /api/clients/profile - Get authenticated client's profile
router.get('/profile', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        console.log('🏢 Fetching client profile:', req.userId);
        
        const query = `
            SELECT 
                u.*,
                c.*
            FROM users u
            JOIN clients c ON u.user_id = c.user_id
            WHERE u.user_id = $1
        `;
        
        const result = await pool.query(query, [req.userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client profile not found' });
        }
        
        console.log('✅ Client profile fetched successfully');
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('❌ Error fetching client profile:', error);
        res.status(500).json({ 
            error: 'Failed to fetch profile',
            details: error.message 
        });
    }
});

// PATCH /api/clients/profile - Update client profile
router.patch('/profile', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        console.log('🏢 Updating client profile:', req.userId);
        
        const userUpdates = {};
        const clientUpdates = {};
        
        // Separate user and client fields
        const userFields = ['first_name', 'last_name', 'phone', 'address', 'city', 'country', 'postal_code'];
        const clientFields = [
            'company_name', 'company_registration', 'vat_number', 'industry_type', 
            'company_website', 'contact_first_name', 'contact_last_name', 'contact_phone',
            'company_address', 'billing_address', 'fleet_size', 'annual_volume_estimate',
            'preferred_payment_method', 'preferred_driver_requirements'
        ];
        
        for (const [key, value] of Object.entries(req.body)) {
            if (userFields.includes(key)) {
                userUpdates[key] = value;
            } else if (clientFields.includes(key)) {
                clientUpdates[key] = value;
            }
        }
        
        const client = await database.connect();
        
        try {
            await client.query('BEGIN');
            
            // Update users table
            if (Object.keys(userUpdates).length > 0) {
                const userSetClause = Object.keys(userUpdates)
                    .map((key, index) => `${key} = $${index + 2}`)
                    .join(', ');
                
                const userQuery = `
                    UPDATE users 
                    SET ${userSetClause}, updated_at = NOW()
                    WHERE user_id = $1
                `;
                
                await client.query(userQuery, [req.userId, ...Object.values(userUpdates)]);
            }
            
            // Update clients table
            if (Object.keys(clientUpdates).length > 0) {
                const clientSetClause = Object.keys(clientUpdates)
                    .map((key, index) => `${key} = $${index + 2}`)
                    .join(', ');
                
                const clientQuery = `
                    UPDATE clients 
                    SET ${clientSetClause}, updated_at = NOW()
                    WHERE user_id = $1
                `;
                
                await client.query(clientQuery, [req.userId, ...Object.values(clientUpdates)]);
            }
            
            await client.query('COMMIT');
            
            console.log('✅ Client profile updated successfully');
            
            res.json({
                message: 'Profile updated successfully',
                userUpdates,
                clientUpdates
            });
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
        
    } catch (error) {
        console.error('❌ Error updating client profile:', error);
        res.status(500).json({ 
            error: 'Failed to update profile',
            details: error.message 
        });
    }
});

// GET /api/clients/:clientId - Get specific client details (admin only)
router.get('/:clientId', requireAuth, async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log('🏢 Fetching client details:', clientId);
        
        const query = `
            SELECT 
                u.*,
                c.*,
                COUNT(j.job_id) as total_jobs_posted,
                COUNT(CASE WHEN j.status = 'active' THEN 1 END) as active_jobs
            FROM users u
            JOIN clients c ON u.user_id = c.user_id
            LEFT JOIN jobs j ON u.user_id = j.client_id
            WHERE u.user_id = $1 AND u.role = 'client'
            GROUP BY u.user_id, c.user_id
        `;
        
        const result = await pool.query(query, [clientId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        console.log('✅ Client details fetched:', result.rows[0].company_name);
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('❌ Error fetching client details:', error);
        res.status(500).json({ 
            error: 'Failed to fetch client details',
            details: error.message 
        });
    }
});

// GET /api/clients/stats/overview - Get client statistics (admin only)
router.get('/stats/overview', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        console.log('📊 Fetching client statistics');
        
        const query = `
            SELECT 
                COUNT(*) as total_clients,
                COUNT(CASE WHEN c.is_active_client = true THEN 1 END) as active_clients,
                COUNT(CASE WHEN c.client_tier = 'platinum' THEN 1 END) as platinum_clients,
                COUNT(CASE WHEN c.client_tier = 'gold' THEN 1 END) as gold_clients,
                COUNT(CASE WHEN c.client_tier = 'silver' THEN 1 END) as silver_clients,
                COUNT(CASE WHEN c.client_tier = 'bronze' THEN 1 END) as bronze_clients,
                AVG(c.fleet_size) as avg_fleet_size,
                SUM(c.annual_volume_estimate) as total_annual_volume
            FROM users u
            JOIN clients c ON u.user_id = c.user_id
            WHERE u.role = 'client'
        `;
        
        const result = await database.query(query);
        
        console.log('📊 Client statistics fetched');
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('❌ Error fetching client statistics:', error);
        res.status(500).json({ 
            error: 'Failed to fetch client statistics',
            details: error.message 
        });
    }
});

export default router;

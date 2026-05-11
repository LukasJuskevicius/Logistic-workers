import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { database } from '../dbconn/database.js';

const router = express.Router();

// GET /api/jobs - Get all active jobs (public for drivers to see)
router.get('/', async (req, res) => {
    try {
        console.log('💼 Fetching active jobs');
        
        const query = `
            SELECT * FROM active_jobs_with_clients
            ORDER BY created_at DESC
        `;
        
        const result = await database.query(query);
        
        console.log(`💼 Found ${result.rows.length} active jobs`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching jobs:', error);
        res.status(500).json({ 
            error: 'Failed to fetch jobs',
            details: error.message 
        });
    }
});

// GET /api/jobs/:jobId - Get specific job details
router.get('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log('💼 Fetching job details:', jobId);
        
        const query = `
            SELECT 
                j.*,
                c.company_name,
                c.contact_first_name,
                c.contact_last_name,
                u.email as client_email,
                u.phone as client_phone,
                c.company_website,
                c.industry_type
            FROM jobs j
            JOIN users u ON j.client_id = u.user_id
            JOIN clients c ON u.user_id = c.user_id
            WHERE j.job_id = $1
        `;
        
        const result = await database.query(query, [jobId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        
        console.log('✅ Job details fetched:', result.rows[0].title);
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('❌ Error fetching job details:', error);
        res.status(500).json({ 
            error: 'Failed to fetch job details',
            details: error.message 
        });
    }
});

// POST /api/jobs - Create new job (clients only)
router.post('/', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        const {
            title,
            description,
            job_type,
            location,
            salary_min,
            salary_max,
            currency,
            required_experience_years,
            required_cdl_class,
            required_endorsements,
            shift_type,
            travel_required,
            equipment_provided,
            application_deadline,
            start_date
        } = req.body;
        
        console.log('💼 Creating new job:', { title, location, clientId: req.userId });
        
        const query = `
            INSERT INTO jobs (
                client_id, title, description, job_type, location,
                salary_min, salary_max, currency, required_experience_years,
                required_cdl_class, required_endorsements, shift_type,
                travel_required, equipment_provided, application_deadline,
                start_date, created_by
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING job_id, title, created_at
        `;
        
        const values = [
            req.userId, title, description, job_type, location,
            salary_min, salary_max, currency || 'EUR', required_experience_years,
            required_cdl_class, required_endorsements || [], shift_type || [],
            travel_required || false, equipment_provided || true,
            application_deadline, start_date, req.userId
        ];
        
        const result = await database.query(query, values);
        
        console.log('✅ Job created successfully:', result.rows[0]);
        
        res.status(201).json({
            message: 'Job created successfully',
            job: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error creating job:', error);
        res.status(500).json({ 
            error: 'Failed to create job',
            details: error.message 
        });
    }
});

// GET /api/jobs/my/posted - Get jobs posted by authenticated client
router.get('/my/posted', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        console.log('💼 Fetching jobs posted by client:', req.userId);
        
        const query = `
            SELECT 
                j.*,
                COUNT(ja.application_id) as application_count
            FROM jobs j
            LEFT JOIN job_applications ja ON j.job_id = ja.job_id
            WHERE j.client_id = $1
            GROUP BY j.job_id
            ORDER BY j.created_at DESC
        `;
        
        const result = await database.query(query, [req.userId]);
        
        console.log(`💼 Found ${result.rows.length} jobs posted by client`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching client jobs:', error);
        res.status(500).json({ 
            error: 'Failed to fetch your jobs',
            details: error.message 
        });
    }
});

// POST /api/jobs/:jobId/apply - Apply for a job (drivers only)
router.post('/:jobId/apply', authenticateToken, requireRole(['driver']), async (req, res) => {
    try {
        const { jobId } = req.params;
        const { cover_letter } = req.body;
        
        console.log('📝 Driver applying for job:', { jobId, driverId: req.userId });
        
        // Check if job exists and is active
        const jobCheck = await database.query(
            'SELECT job_id, title FROM jobs WHERE job_id = $1 AND status = $2',
            [jobId, 'active']
        );
        
        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found or not active' });
        }
        
        // Check if already applied
        const existingApplication = await database.query(
            'SELECT application_id FROM job_applications WHERE job_id = $1 AND driver_id = $2',
            [jobId, req.userId]
        );
        
        if (existingApplication.rows.length > 0) {
            return res.status(400).json({ error: 'You have already applied for this job' });
        }
        
        const query = `
            INSERT INTO job_applications (job_id, driver_id, cover_letter)
            VALUES ($1, $2, $3)
            RETURNING application_id, applied_at
        `;
        
        const result = await database.query(query, [jobId, req.userId, cover_letter]);
        
        console.log('✅ Application submitted successfully:', result.rows[0]);
        
        res.status(201).json({
            message: 'Application submitted successfully',
            application: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error submitting application:', error);
        res.status(500).json({ 
            error: 'Failed to submit application',
            details: error.message 
        });
    }
});

// GET /api/jobs/my/applications - Get applications by authenticated driver
router.get('/my/applications', authenticateToken, requireRole(['driver']), async (req, res) => {
    try {
        console.log('📝 Fetching applications for driver:', req.userId);
        
        const query = `
            SELECT 
                ja.*,
                j.title,
                j.location,
                j.salary_min,
                j.salary_max,
                j.currency,
                c.company_name
            FROM job_applications ja
            JOIN jobs j ON ja.job_id = j.job_id
            JOIN users u ON j.client_id = u.user_id
            JOIN clients c ON u.user_id = c.user_id
            WHERE ja.driver_id = $1
            ORDER BY ja.applied_at DESC
        `;
        
        const result = await database.query(query, [req.userId]);
        
        console.log(`📝 Found ${result.rows.length} applications for driver`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching driver applications:', error);
        res.status(500).json({ 
            error: 'Failed to fetch your applications',
            details: error.message 
        });
    }
});

// GET /api/jobs/:jobId/applications - Get applications for a job (client only)
router.get('/:jobId/applications', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log('📝 Fetching applications for job:', jobId);
        
        // Verify job belongs to client
        const jobCheck = await database.query(
            'SELECT job_id FROM jobs WHERE job_id = $1 AND client_id = $2',
            [jobId, req.userId]
        );
        
        if (jobCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Access denied to this job' });
        }
        
        const query = `
            SELECT 
                ja.*,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                d.experience_years,
                d.license_type,
                d.cdl_class,
                d.hourly_rate,
                d.is_available
            FROM job_applications ja
            JOIN users u ON ja.driver_id = u.user_id
            JOIN drivers d ON u.user_id = d.user_id
            WHERE ja.job_id = $1
            ORDER BY ja.applied_at DESC
        `;
        
        const result = await database.query(query, [jobId]);
        
        console.log(`📝 Found ${result.rows.length} applications for job`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching job applications:', error);
        res.status(500).json({ 
            error: 'Failed to fetch job applications',
            details: error.message 
        });
    }
});

// PATCH /api/jobs/:jobId/applications/:applicationId - Update application status (client only)
router.patch('/:jobId/applications/:applicationId', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        const { jobId, applicationId } = req.params;
        const { status, notes } = req.body;
        
        console.log('📝 Updating application status:', { applicationId, status });
        
        // Verify job belongs to client
        const jobCheck = await database.query(
            'SELECT job_id FROM jobs WHERE job_id = $1 AND client_id = $2',
            [jobId, req.userId]
        );
        
        if (jobCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Access denied to this job' });
        }
        
        const query = `
            UPDATE job_applications 
            SET status = $1, notes = $2, updated_at = NOW()
            WHERE application_id = $3 AND job_id = $4
            RETURNING application_id, status, updated_at
        `;
        
        const result = await database.query(query, [status, notes, applicationId, jobId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        
        console.log('✅ Application status updated:', result.rows[0]);
        
        res.json({
            message: 'Application status updated successfully',
            application: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error updating application status:', error);
        res.status(500).json({ 
            error: 'Failed to update application status',
            details: error.message 
        });
    }
});

// PATCH /api/jobs/:jobId - Update job (client only)
router.patch('/:jobId', authenticateToken, requireRole(['client']), async (req, res) => {
    try {
        const { jobId } = req.params;
        const updates = req.body;
        
        console.log('💼 Updating job:', { jobId, updates });
        
        // Verify job belongs to client
        const jobCheck = await database.query(
            'SELECT job_id FROM jobs WHERE job_id = $1 AND client_id = $2',
            [jobId, req.userId]
        );
        
        if (jobCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Access denied to this job' });
        }
        
        // Build dynamic update query
        const allowedFields = [
            'title', 'description', 'job_type', 'location', 'salary_min', 'salary_max',
            'required_experience_years', 'required_cdl_class', 'required_endorsements',
            'shift_type', 'travel_required', 'equipment_provided', 'application_deadline',
            'start_date', 'status'
        ];
        
        const updateFields = [];
        const values = [];
        let paramCount = 1;
        
        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key)) {
                updateFields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }
        
        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        
        updateFields.push(`updated_at = NOW()`);
        values.push(jobId);
        
        const query = `
            UPDATE jobs 
            SET ${updateFields.join(', ')}
            WHERE job_id = $${paramCount}
            RETURNING job_id, title, updated_at
        `;
        
        const result = await database.query(query, values);
        
        console.log('✅ Job updated successfully:', result.rows[0]);
        
        res.json({
            message: 'Job updated successfully',
            job: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error updating job:', error);
        res.status(500).json({ 
            error: 'Failed to update job',
            details: error.message 
        });
    }
});

// DELETE /api/jobs/:jobId - Delete a job (admin or the client who posted it)
router.delete('/:jobId', authenticateToken, async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log('🗑️ Deleting job:', { jobId, userId: req.userId, role: req.userRole });

        // Admins can delete any job; clients can only delete their own
        let jobCheck;
        if (req.userRole === 'admin') {
            jobCheck = await database.query(
                'SELECT job_id FROM jobs WHERE job_id = $1',
                [jobId]
            );
        } else {
            jobCheck = await database.query(
                'SELECT job_id FROM jobs WHERE job_id = $1 AND client_id = $2',
                [jobId, req.userId]
            );
        }

        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found or access denied' });
        }

        await database.query('DELETE FROM jobs WHERE job_id = $1', [jobId]);

        console.log('✅ Job deleted successfully:', jobId);
        res.json({ message: 'Job deleted successfully', job_id: jobId });

    } catch (error) {
        console.error('❌ Error deleting job:', error);
        res.status(500).json({
            error: 'Failed to delete job',
            details: error.message
        });
    }
});

export default router;

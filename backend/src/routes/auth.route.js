// auth.route.js
import express from 'express';
import { database } from '../dbconn/database.js';
import { findUserById } from '../daos/user.dao.js';

const router = express.Router();

router.get('/api/auth', async (req, res) => {
  try {
    // 1. Extract sessionId from cookies
    //    - Automatically parsed by cookie-parser middleware
    const sessionId = req.cookies.sessionId;
    
    // 2. If no session ID, user is not authenticated
    if (!sessionId) return res.json({ user: null });

    // 3. Find session in database using actual SQL (matching your table structure)
    const sessionResult = await database.query(
      'SELECT * FROM user_sessions WHERE session_token = $1 AND is_active = true',
      [sessionId]
    );
    
    // 4. Check if session exists and is active
    if (sessionResult.rows.length === 0) {
      return res.json({ user: null });  // Session invalid or inactive
    }

    // 5. Get user data using DAO
    const user = await findUserById(sessionResult.rows[0].user_id);
    if (!user) {
      return res.json({ user: null });
    }
    
    // 6. Get role-specific profile data (NEW SCHEMA - personal info in users table)
    let profileData = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      country: user.country
    };

    try {
      if (user.role === 'driver') {
        const driverResult = await database.query(
          'SELECT license_number, license_type, cdl_class, experience_years, is_available, hourly_rate FROM drivers WHERE user_id = $1',
          [user.user_id]
        );
        if (driverResult.rows.length > 0) {
          profileData.driverInfo = driverResult.rows[0];
        }
      } else if (user.role === 'client') {
        const clientResult = await database.query(
          'SELECT company_name, company_registration, industry_type, client_tier FROM clients WHERE user_id = $1',
          [user.user_id]
        );
        if (clientResult.rows.length > 0) {
          profileData.clientInfo = clientResult.rows[0];
        }
      } else if (user.role === 'admin') {
        const adminResult = await database.query(
          'SELECT department, role_level, permissions FROM admins WHERE user_id = $1',
          [user.user_id]
        );
        if (adminResult.rows.length > 0) {
          profileData.adminInfo = adminResult.rows[0];
        }
      }
    } catch (profileError) {
      console.warn('Profile data fetch error:', profileError);
    }
    
    // 7. Return user data with profile info
    res.json({ 
      user: { 
        id: user.user_id, 
        email: user.email,
        role: user.role || 'client',
        ...profileData
      } 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
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
    
    // 6. Get role-specific profile data
    let profileData = {};
    try {
      if (user.role === 'driver') {
        const driverResult = await database.query(
          'SELECT first_name, last_name FROM drivers WHERE user_id = $1',
          [user.user_id]
        );
        if (driverResult.rows.length > 0) {
          profileData.firstName = driverResult.rows[0].first_name;
          profileData.lastName = driverResult.rows[0].last_name;
        }
      } else if (user.role === 'client') {
        const clientResult = await database.query(
          'SELECT company_name, first_name, last_name FROM clients WHERE user_id = $1',
          [user.user_id]
        );
        if (clientResult.rows.length > 0) {
          profileData.companyName = clientResult.rows[0].company_name;
          profileData.firstName = clientResult.rows[0].first_name;
          profileData.lastName = clientResult.rows[0].last_name;
        }
      } else if (user.role === 'admin') {
        const adminResult = await database.query(
          'SELECT first_name, last_name FROM admins WHERE user_id = $1',
          [user.user_id]
        );
        if (adminResult.rows.length > 0) {
          profileData.firstName = adminResult.rows[0].first_name;
          profileData.lastName = adminResult.rows[0].last_name;
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
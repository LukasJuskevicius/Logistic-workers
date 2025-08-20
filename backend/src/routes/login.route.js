// backend/src/routes/login.route.js
import express from 'express';
import { database } from '../dbconn/database.js';
import { findUserByEmail } from '../daos/user.dao.js';
import { verifyPassword } from '../utils/auth.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user by email using DAO
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Create session using actual SQL (matching your table structure)
    const sessionToken = crypto.randomUUID();
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';
    
    await database.query(
      'INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, is_active) VALUES ($1, $2, $3, $4, $5)',
      [user.user_id, sessionToken, clientIP, userAgent, true]
    );

    // 4. Set httpOnly cookie (environment-aware)
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('sessionId', sessionToken, {
      httpOnly: true,
      secure: isProduction, // true in production (HTTPS), false in development
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-origin HTTPS, 'lax' for development
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      domain: isProduction ? undefined : undefined // Let browser handle domain
    });

    // 5. Get role-specific profile data
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
          'SELECT company_name, contact_first_name, contact_last_name FROM clients WHERE user_id = $1',
          [user.user_id]
        );
        if (clientResult.rows.length > 0) {
          profileData.companyName = clientResult.rows[0].company_name;
          profileData.firstName = clientResult.rows[0].contact_first_name;
          profileData.lastName = clientResult.rows[0].contact_last_name;
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

    // 6. Return success response with user data (matching frontend expectations)
    res.json({ 
      success: true,
      user: { 
        id: user.user_id, 
        email: user.email,
        role: user.role || 'client',
        ...profileData
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
// backend/src/routes/login.route.js
import express from 'express';
import { database } from '../dbconn/database.js';
import { findUserByEmail } from '../daos/user.dao.js';
import { verifyPassword } from '../utils/auth.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  try {
    console.log('\n=== 🔐 LOGIN ATTEMPT STARTED ===');
    console.log('Request body:', req.body);
    console.log('Email provided:', req.body.email);
    console.log('Password provided:', req.body.password ? `Yes (${req.body.password.length} chars)` : 'No');
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // 1. Find user by email using DAO
    console.log('\n--- STEP 1: User Lookup ---');
    console.log('🔍 Looking up user with email:', email);
    
    let user;
    try {
      user = await findUserByEmail(email);
      console.log('📊 Database query completed');
      console.log('👤 User lookup result:', user ? 'FOUND' : 'NOT FOUND');
      
      if (user) {
        console.log('👤 User details:', {
          user_id: user.user_id,
          email: user.email,
          role: user.role,
          is_active: user.is_active,
          is_verified: user.is_verified,
          hasPasswordHash: !!user.password_hash,
          passwordHashLength: user.password_hash ? user.password_hash.length : 0,
          created_at: user.created_at
        });
      }
    } catch (userLookupError) {
      console.log('❌ Error during user lookup:', userLookupError.message);
      console.log('❌ User lookup stack:', userLookupError.stack);
      return res.status(500).json({ error: 'Database error during user lookup' });
    }
    
    if (!user) {
      console.log('❌ AUTHENTICATION FAILED: User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Verify password
    console.log('\n--- STEP 2: Password Verification ---');
    console.log('🔑 Input password:', password);
    console.log('🔑 Stored hash:', user.password_hash ? user.password_hash.substring(0, 20) + '...' : 'NULL');
    
    let isValidPassword;
    try {
      isValidPassword = await verifyPassword(password, user.password_hash);
      console.log('🔑 Password verification completed');
      console.log('🔑 Password verification result:', isValidPassword);
    } catch (passwordError) {
      console.log('❌ Error during password verification:', passwordError.message);
      console.log('❌ Password verification stack:', passwordError.stack);
      return res.status(500).json({ error: 'Error during password verification' });
    }
    
    if (!isValidPassword) {
      console.log('❌ AUTHENTICATION FAILED: Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('✅ Password verification successful!');

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

    // 5. Get role-specific profile data (NEW SCHEMA - personal info in users table)
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
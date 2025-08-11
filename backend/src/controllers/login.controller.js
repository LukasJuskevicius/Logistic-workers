import { findUserByEmail } from '../daos/user.dao.js';
import bcrypt from 'bcrypt';

// Clean login controller with single responsibility
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Find user with error handling
    let user;
    try {
      user = await findUserByEmail(email);
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      console.error('Database connection details:', {
        host: process.env.DB_HOST || 'not set',
        database: process.env.DB_NAME || 'not set',
        hasConnectionString: !!process.env.DATABASE_URL || !!process.env.DATABASE_PUBLIC_URL
      });
      return res.status(500).json({ 
        error: "Database connection error",
        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Check if session middleware is available
    if (!req.session) {
      console.error('Session middleware not available');
      return res.status(500).json({ 
        error: "Session configuration error",
        details: "Session middleware is not properly configured"
      });
    }
    
    // Set session
    req.session.userId = user.user_id;
    req.session.role = user.role;
    
    // Try to save session, but also allow auto-save
    if (req.session.save) {
      req.session.save((err) => {
        if (err) {
          console.error('Session save warning:', err);
          // Don't fail completely, session might still work with auto-save
        }
      });
    }
    
    // Send response immediately
    res.json({ 
      success: true,
      message: "Login successful", 
      user: {
        id: user.user_id,
        email: user.email, 
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: "Login failed",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

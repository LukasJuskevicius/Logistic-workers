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
    
    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Set session
    req.session.userId = user.user_id;
    req.session.role = user.role;
    
    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Session save failed" });
      }
      
      res.json({ 
        success: true,
        message: "Login successful", 
        user: {
          id: user.user_id,
          email: user.email, 
          role: user.role
        }
      });
    });
    
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: "Login failed" });
  }
}

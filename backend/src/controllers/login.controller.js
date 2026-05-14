// login.controller.js
import { findUserByEmail } from '../daos/user.dao.js';
import bcrypt from 'bcryptjs';

// Helper validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function loginUser(req, res) {
  const { email, password } = req.body;
  
  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Find user with error handling
  let user;
  try {
    user = await findUserByEmail(email);
  } catch (dbError) {
    return res.status(500).json({ 
      error: "Database connection error"
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

  // Rest of your login logic...
  req.login(user, (err) => {
    if (err) {
      return res.status(500).json({ error: "Login failed" });
    }
    return res.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  });
}
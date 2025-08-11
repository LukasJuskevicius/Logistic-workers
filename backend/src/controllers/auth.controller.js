import { findUserByEmail, findOrCreateGoogleUser } from '../daos/user.dao.js';
import { getProfileById } from '../daos/profile.dao.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if(passwordHash !== user.password_hash) {
      return res.status(402).json({ error: "Invalid email or password" });
    }
    if(!req.session){
      return res.status(403).json({ error: "session middleware not available"});
    }
    try {
      req.session.userId = user.user_id;
      req.session.role = user.role;
      
      // 4. Verify session was set
      if (!req.session.userId || !req.session.role) {
        throw new Error('Failed to set session data');
      }
    } catch (sessionError) {
      console.error('Session error:', sessionError);
      return res.status(500).json({ error: "Failed to create session" });
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
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

export function checkAuth(req, res) {
  const userId = req.session.userId || null;
  res.json({ authenticated: !!userId, userId, role: req.session.role });
}

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
});

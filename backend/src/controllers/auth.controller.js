import { findUserByEmail, findOrCreateGoogleUser } from '../daos/user.dao.js';
import { getProfileById } from '../daos/profile.dao.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    req.session.userId = user.user_id;
    req.session.role = user.role;
    
    const profile = await getProfileById(user.user_id);
    res.json({ 
      message: "Login successful", 
      user: {
        id: user.user_id,
        email: user.email, 
        role: user.role,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        profile_picture: profile?.profile_picture
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

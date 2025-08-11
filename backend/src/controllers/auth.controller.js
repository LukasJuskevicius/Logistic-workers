import { findUserByEmail, findOrCreateGoogleUser } from '../daos/user.dao.js';
import { getProfileById } from '../daos/profile.dao.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

// export async function loginUser(req, res) {
//   try {
//     const { email, password } = req.body;
//     const user = await findUserByEmail(email);
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }
//     if(!(await bcrypt.compare(password, user.password_hash))) {
//       return res.status(402).json({ error: "Invalid email or password" });
//     }
//     if(!req.session){
//       return res.status(403).json({ error: "session middleware not available"});
//     }
//     try {
//       req.session.userId = user.user_id;
//       req.session.role = user.role;
      
//       // 4. Verify session was set
//       if (!req.session.userId || !req.session.role) {
//         throw new Error('Failed to set session data');
//       }
//     } catch (sessionError) {
//       console.error('Session error:', sessionError);
//       return res.status(500).json({ error: "Failed to create session" });
//     }
//     res.json({ message: "Login successful", username: user.username })
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export async function loginUser(req, res) {
  try {
    console.log('🔐 Login attempt started');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password length:', password ? password.length : 'undefined');
    
    console.log('🔍 Looking for user...');
    const user = await findUserByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    console.log('🔐 Comparing passwords...');
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    console.log('✅ Password valid, setting session...');
    req.session.userId = user.user_id;
    req.session.role = user.role;
    
    console.log('📤 Sending response...');
    res.json({ 
      success: true,
      message: "Login successful", 
      user: {
        id: user.user_id,
        email: user.email, 
        role: user.role
      }
    });
    
    console.log('✅ Login successful');
    
  } catch (error) {
    console.error('💥 LOGIN ERROR:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    res.status(500).json({ error: "Login failed", details: error.message });
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

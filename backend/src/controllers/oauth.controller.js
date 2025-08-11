import passport from 'passport';

// Google OAuth handlers
export const googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'] 
});

export const googleCallback = passport.authenticate('google', {
  successRedirect: process.env.OAUTH_SUCCESS_REDIRECT || '/dashboard',
  failureRedirect: process.env.OAUTH_FAILURE_REDIRECT || '/login'
});

// Check authentication status
export function checkAuth(req, res) {
  const userId = req.session?.userId || null;
  const role = req.session?.role || null;
  
  res.json({ 
    authenticated: !!userId, 
    userId, 
    role 
  });
}

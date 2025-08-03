import { supabase } from '../config/supabase.js';

// Base authentication middleware
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

// Get user profile for role checking
const getUserProfile = async (userId) => {
  const { data: profile, error } = await supabase
    .from('users')
    .select('type')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    throw new Error('User profile not found');
  }

  return profile;
};

// Role-based middleware
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const profile = await getUserProfile(req.user.id);
    
    if (profile.type !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    next();
  } catch (error) {
    console.error('❌ Admin check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authorization failed'
    });
  }
};

export const requireDriver = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const profile = await getUserProfile(req.user.id);
    
    if (profile.type !== 'driver') {
      return res.status(403).json({
        success: false,
        error: 'Driver access required'
      });
    }

    next();
  } catch (error) {
    console.error('❌ Driver check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authorization failed'
    });
  }
};

export const requireClient = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const profile = await getUserProfile(req.user.id);
    
    if (profile.type !== 'client') {
      return res.status(403).json({
        success: false,
        error: 'Client access required'
      });
    }

    next();
  } catch (error) {
    console.error('❌ Client check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authorization failed'
    });
  }
}; 
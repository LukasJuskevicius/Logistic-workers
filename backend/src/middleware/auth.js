// Authentication middleware
export async function requireAuth(req, res, next) {
  try {
    // 1. Extract sessionId from cookies (matching your login system)
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      });
    }

    // 2. Check session in database (matching your auth.route.js logic)
    const { database } = await import('../dbconn/database.js');
    const sessionResult = await database.query(
      'SELECT user_id FROM user_sessions WHERE session_token = $1 AND is_active = true',
      [sessionId]
    );
    
    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid or expired session',
        code: 'SESSION_INVALID' 
      });
    }

    // 3. Add user_id to request for use in route handlers
    req.userId = sessionResult.rows[0].user_id;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication error',
      code: 'AUTH_ERROR' 
    });
  }
}

// Role-based access control
export function requireRole(...roles) {
  return async (req, res, next) => {
    try {
      // First ensure user is authenticated
      await requireAuth(req, res, () => {});
      
      if (!req.userId) {
        return res.status(401).json({ 
          error: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
      }

      // Get user role from database
      const { database } = await import('../dbconn/database.js');
      const userResult = await database.query(
        'SELECT role FROM users WHERE user_id = $1',
        [req.userId]
      );
      
      if (userResult.rows.length === 0) {
        return res.status(401).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      const userRole = userResult.rows[0].role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ 
          error: `Access denied. Required role: ${roles.join(' or ')}`,
          code: 'INSUFFICIENT_PERMISSIONS'
        });
      }
      
      req.userRole = userRole;
      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      return res.status(500).json({ 
        error: 'Authorization error',
        code: 'AUTH_ERROR' 
      });
    }
  };
}

export const requireAdmin = requireRole('admin');
export const requireDriver = requireRole('driver');
export const requireClient = requireRole('client');
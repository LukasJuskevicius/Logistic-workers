import { database } from '../dbconn/database.js';

export async function requireAuth(req, res, next) {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({ error: 'Authentication required', code: 'AUTH_REQUIRED' });
    }

    const sessionResult = await database.query(
      'SELECT user_id FROM user_sessions WHERE session_token = $1 AND is_active = true',
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired session', code: 'SESSION_INVALID' });
    }

    req.userId = sessionResult.rows[0].user_id;

    const roleResult = await database.query(
      'SELECT role FROM users WHERE user_id = $1',
      [req.userId]
    );
    if (roleResult.rows.length > 0) {
      req.userRole = roleResult.rows[0].role;
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error', code: 'AUTH_ERROR' });
  }
}

export function requireRole(...roles) {
  if (roles.length === 1 && Array.isArray(roles[0])) {
    roles = roles[0];
  }
  return async (req, res, next) => {
    try {
      await requireAuth(req, res, () => {});

      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required', code: 'AUTH_REQUIRED' });
      }

      const userResult = await database.query(
        'SELECT role FROM users WHERE user_id = $1',
        [req.userId]
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
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
      return res.status(500).json({ error: 'Authorization error', code: 'AUTH_ERROR' });
    }
  };
}

export const authenticateToken = requireAuth;
export const requireAdmin = requireRole('admin');
export const requireDriver = requireRole('driver');
export const requireClient = requireRole('client');

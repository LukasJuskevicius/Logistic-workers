// Authentication middleware
export function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ 
      error: 'Authentication required',
      code: 'AUTH_REQUIRED' 
    });
  }
  next();
}

// Role-based access control
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session?.userId) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    if (!roles.includes(req.session.role)) {
      return res.status(403).json({ 
        error: `Access denied. Required role: ${roles.join(' or ')}`,
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    next();
  };
}

export const requireAdmin = requireRole('admin');
export const requireDriver = requireRole('driver');
export const requireClient = requireRole('client');
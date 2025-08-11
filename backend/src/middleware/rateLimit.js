import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                  // 100 requests per window
  message: {
    success: false,
    error: 'Too many requests, try again later.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable X-RateLimit headers
  // Trust proxy is set in index.js, so this will work correctly
  keyGenerator: (req) => {
    // Use X-Forwarded-For if available (from proxy), otherwise use IP
    return req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  }
});
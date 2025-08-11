import express from 'express';
import { database } from '../dbconn/database.js';

const router = express.Router();

// Health check endpoint
router.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      session: false,
      database: false
    }
  };
  
  // Check session
  try {
    if (req.session) {
      req.session.testValue = 'test';
      health.checks.session = true;
    }
  } catch (err) {
    health.checks.sessionError = err.message;
  }
  
  // Check database
  try {
    const result = await database.query('SELECT NOW()');
    health.checks.database = true;
    health.checks.databaseTime = result.rows[0].now;
  } catch (err) {
    health.checks.databaseError = err.message;
  }
  
  // Overall status
  if (!health.checks.session || !health.checks.database) {
    health.status = 'degraded';
    res.status(503);
  }
  
  res.json(health);
});

export default router;

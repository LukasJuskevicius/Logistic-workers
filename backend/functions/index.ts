import { Hono } from 'npm:hono@4.0.0';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';

// Import function modules
import authRoutes from './auth/login.ts';
import registerRoutes from './auth/register.ts';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('*', logger(console.log));

// Health check
app.get('/make-server-8675f3cb/health', (c) => {
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// Mount routes
app.route('/make-server-8675f3cb/auth', authRoutes);
app.route('/make-server-8675f3cb/auth', registerRoutes);

// Error handler
app.onError((err, c) => {
  console.error('Global error:', err);
  return c.json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  }, 500);
});

console.log('🚀 Logistic Workers API Server v2.0 started');
console.log('📁 Clean modular structure initialized');

export default app;
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env');

// Import routes
import loginRoute from './routes/login.route.js';
import registerRoute from './routes/register.route.js';
import logoutRoute from './routes/logout.route.js';
import vacanciesRoute from './routes/vacancies.route.js';

// Import Supabase config
import { checkDatabaseTables, getDatabaseStats } from './config/supabase.js';

dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const tablesExist = await checkDatabaseTables();
    const stats = await getDatabaseStats();
    
    return res.json({
      success: true,
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: {
        tablesExist,
        stats: tablesExist ? stats : null
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('❌ Health check error:', error);
    return res.status(500).json({
      success: false,
      status: 'ERROR',
      error: error.message
    });
  }
});

// Database status endpoint
app.get('/database/status', async (req, res) => {
  try {
    const tablesExist = await checkDatabaseTables();
    const stats = await getDatabaseStats();
    
    return res.json({
      success: true,
      tablesExist,
      stats: tablesExist ? stats : null
    });
  } catch (error) {
    console.error('❌ Database status error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Mount routes
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/vacancies', vacanciesRoute);

// 404 handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global error:', error);
  
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, async () => {
  console.log('🚀 Logistic Workers Backend Server Started');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check database tables on startup
  try {
    const tablesExist = await checkDatabaseTables();
    if (tablesExist) {
      const stats = await getDatabaseStats();
      console.log('✅ Database connection successful');
      console.log('📊 Database stats:', stats);
    } else {
      console.log('⚠️  Database tables not found. Please run the database setup script.');
    }
  } catch (error) {
    console.error('❌ Database check failed:', error);
  }
  
  console.log('🎯 Ready to handle requests!');
});

export default app; 
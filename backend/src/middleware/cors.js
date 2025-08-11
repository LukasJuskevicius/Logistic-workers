import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
  'https://logistic-workers.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('CORS allowed origins:', allowedOrigins);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
});


// enterprice security
//allowedHeaders: 
    //'Content-Type',
    //'X-Requested-With', 
    //'X-CSRF-Token',
    //'X-Client-Version',
    //'X-Request-ID',          // Request tracking
    //'X-API-Key',             // API authentication
    //'User-Agent',            // Device identification
    //'Accept-Language'        // Localization
  

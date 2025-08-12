import cors from 'cors';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Production origins from environment
const productionOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['https://logistic-workers.vercel.app'];

// Development origins
const developmentOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173'
];

const allowedOrigins = isDevelopment 
  ? [...developmentOrigins, ...productionOrigins]
  : productionOrigins;

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin in development only
    if (!origin && isDevelopment) {
      return callback(null, true);
    }
    
    if (!origin) {
      return callback(new Error('Missing origin header'));
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
});

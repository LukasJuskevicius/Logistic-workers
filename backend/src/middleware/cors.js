import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
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
  

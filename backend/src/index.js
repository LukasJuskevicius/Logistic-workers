import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from './config/passport.js';
import { database } from './dbconn/database.js';
import { createSessionConfig } from './config/session.js';

//Routes
import loginRoute from "./routes/login.route.js"
import logoutRoute from './routes/logout.route.js';
import oauthRoute from './routes/oauth.route.js';
import registerRoute from './routes/register.route.js';

import profileRoute from './routes/profile.route.js';
import messageRoute from './routes/message.route.js';
import adminRoute from './routes/admin.route.js';
import driverRoute from './routes/driver.route.js';
import clientRoute from './routes/client.route.js';
import healthRoute from './routes/health.route.js';
import authRoute from './routes/auth.route.js';
// Middleware
import { corsMiddleware } from './middleware/cors.js';
import { rateLimitMiddleware } from './middleware/rateLimit.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Railway/production deployments
app.set('trust proxy', true);

app.use(helmet());
app.use(corsMiddleware);
app.use(rateLimitMiddleware);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static files for document uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Session configuration
const sessionConfig = createSessionConfig(database);
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

// Health check (no auth required)
app.use(healthRoute);

app.use(authRoute)
app.use(loginRoute)
app.use(logoutRoute);
app.use(oauthRoute);
app.use(registerRoute);

// User routes
app.use(profileRoute);
app.use(messageRoute);

// Role-specific routes
app.use(driverRoute);
app.use(clientRoute);
app.use(adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 

export default app;
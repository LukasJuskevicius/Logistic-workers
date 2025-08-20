// src/config/database.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL || 
                        process.env.DATABASE_PUBLIC_URL || 
                        process.env.DATABASE_PRIVATE_URL;

if (!connectionString && process.env.NODE_ENV === 'production') {
  console.error('CRITICAL: No database connection string found in production!');
  console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('DATABASE')));
}

export const database = new Pool({
  connectionString: connectionString || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

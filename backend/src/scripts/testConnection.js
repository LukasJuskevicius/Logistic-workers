// src/scripts/testConnection.js
console.log('🔌 Testing database connection...');

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConnection() {
  try {
    console.log('📡 Attempting to connect...');
    
    
    // Create new pool with DATABASE_PUBLIC_URL
    const testPool = new Pool({
      connectionString: process.env.DATABASE_PUBLIC_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    // Test connection
    const client = await testPool.connect();
    console.log('✅ Connected to database successfully!');
    
    // Test simple query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('⏰ Current database time:', result.rows[0].current_time);
    
    client.release();
    await testPool.end();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);

  }
}

testConnection();

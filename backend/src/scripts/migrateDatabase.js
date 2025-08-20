import { database } from '../dbconn/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateDatabase() {
    const client = await database.connect();
    
    try {
        console.log('🚀 Starting database migration...');
        
        // Step 1: Read and execute new schema
        console.log('📋 Creating new database schema...');
        const schemaSQL = fs.readFileSync(
            path.join(__dirname, 'newDatabaseSchema.sql'), 
            'utf8'
        );
        
        await client.query('BEGIN');
        await client.query(schemaSQL);
        console.log('✅ New schema created successfully');
        
        // Step 2: Seed demo data
        console.log('🌱 Seeding demo data...');
        const seedSQL = fs.readFileSync(
            path.join(__dirname, 'seedDemoData.sql'), 
            'utf8'
        );
        
        await client.query(seedSQL);
        console.log('✅ Demo data seeded successfully');
        
        // Step 3: Verify data
        console.log('🔍 Verifying migration...');
        
        const userCount = await client.query('SELECT COUNT(*) FROM users');
        const driverCount = await client.query('SELECT COUNT(*) FROM drivers');
        const clientCount = await client.query('SELECT COUNT(*) FROM clients');
        const adminCount = await client.query('SELECT COUNT(*) FROM admins');
        const jobCount = await client.query('SELECT COUNT(*) FROM jobs');
        const documentCount = await client.query('SELECT COUNT(*) FROM documents');
        
        console.log('📊 Migration Results:');
        console.log(`   Users: ${userCount.rows[0].count}`);
        console.log(`   Drivers: ${driverCount.rows[0].count}`);
        console.log(`   Clients: ${clientCount.rows[0].count}`);
        console.log(`   Admins: ${adminCount.rows[0].count}`);
        console.log(`   Jobs: ${jobCount.rows[0].count}`);
        console.log(`   Documents: ${documentCount.rows[0].count}`);
        
        // Step 4: Test views
        console.log('🔍 Testing database views...');
        
        const activeDrivers = await client.query('SELECT COUNT(*) FROM driver_profiles WHERE is_available = true');
        const activeJobs = await client.query('SELECT COUNT(*) FROM active_jobs_with_clients');
        const expiringDocs = await client.query('SELECT COUNT(*) FROM expiring_documents');
        
        console.log('📈 View Results:');
        console.log(`   Available Drivers: ${activeDrivers.rows[0].count}`);
        console.log(`   Active Jobs: ${activeJobs.rows[0].count}`);
        console.log(`   Expiring Documents: ${expiringDocs.rows[0].count}`);
        
        await client.query('COMMIT');
        
        console.log('🎉 Database migration completed successfully!');
        console.log('');
        console.log('📝 Demo Accounts Created:');
        console.log('   Admin: admin@logistics.com (password: demo123)');
        console.log('   Drivers: petras.kazlauskas@gmail.com, jonas.petraitis@gmail.com, etc.');
        console.log('   Clients: contact@balticlogistics.lt, info@europetrans.eu, etc.');
        console.log('');
        console.log('🔑 All demo accounts use password: demo123');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', error.message);
        console.error('Stack:', error.stack);
        throw error;
    } finally {
        client.release();
        await database.end();
    }
}

// Run migration if called directly (ES module equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
    migrateDatabase()
        .then(() => {
            console.log('✅ Migration script completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Migration script failed:', error.message);
            process.exit(1);
        });
}

export { migrateDatabase };

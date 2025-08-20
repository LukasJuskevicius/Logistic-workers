import { database } from '../dbconn/database.js';

async function alterTables() {
    try {
        console.log('🔧 Altering database tables to match DriverProfile requirements...');
        await database.query('BEGIN;');

        // Add missing columns to users table
        console.log('📝 Adding missing columns to users table...');
        await database.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS first_name TEXT,
            ADD COLUMN IF NOT EXISTS last_name TEXT,
            ADD COLUMN IF NOT EXISTS phone TEXT,
            ADD COLUMN IF NOT EXISTS address TEXT,
            ADD COLUMN IF NOT EXISTS city TEXT,
            ADD COLUMN IF NOT EXISTS country TEXT,
            ADD COLUMN IF NOT EXISTS postal_code TEXT,
            ADD COLUMN IF NOT EXISTS date_of_birth DATE,
            ADD COLUMN IF NOT EXISTS nationality TEXT;
        `);

        // Add missing columns to drivers table
        console.log('🚛 Adding missing columns to drivers table...');
        await database.query(`
            ALTER TABLE drivers 
            ADD COLUMN IF NOT EXISTS license_type TEXT,
            ADD COLUMN IF NOT EXISTS license_expiry_date DATE,
            ADD COLUMN IF NOT EXISTS preferred_job_types TEXT[] DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS has_own_vehicle BOOLEAN DEFAULT false,
            ADD COLUMN IF NOT EXISTS vehicle_type TEXT,
            ADD COLUMN IF NOT EXISTS vehicle_registration TEXT,
            ADD COLUMN IF NOT EXISTS max_weight TEXT,
            ADD COLUMN IF NOT EXISTS max_volume TEXT,
            ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;
        `);

        // Create driver_documents table for generic document uploads (max 10 per user)
        console.log('📄 Creating driver_documents table...');
        await database.query(`
            CREATE TABLE IF NOT EXISTS driver_documents (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                file_name TEXT NOT NULL,
                file_path TEXT NOT NULL,
                file_size INTEGER,
                mime_type TEXT,
                upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                url TEXT
            );
        `);

        // Note: The 10 document limit will be enforced in the application logic
        console.log('📝 Note: 10 document limit per user will be enforced in application logic');



        // Create indexes for better performance
        console.log('🔍 Creating indexes...');
        await database.query(`
            CREATE INDEX IF NOT EXISTS idx_drivers_is_available ON drivers(is_available);
            CREATE INDEX IF NOT EXISTS idx_driver_documents_user_id ON driver_documents(user_id);
            CREATE INDEX IF NOT EXISTS idx_driver_documents_upload_date ON driver_documents(upload_date);
        `);

        await database.query('COMMIT;');
        console.log('✅ All table alterations completed successfully!');
        
        // Show summary of changes
        console.log('\n📋 Summary of changes:');
        console.log('   • Added personal info columns to users table');
        console.log('   • Added driver-specific columns to drivers table');
        console.log('   • Created driver_documents table for generic file uploads (max 10 per user)');
        console.log('   • Added performance indexes');
        console.log('\n🎉 Database is now ready for the enhanced DriverProfile component!');
        
    } catch (error) {
        await database.query('ROLLBACK;');
        console.error('❌ Error altering tables:', error);
        process.exit(1);
    } finally {
        await database.end();
    }
}

// Call the function
alterTables().catch(console.error);

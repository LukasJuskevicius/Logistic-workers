// Schema verification script to check database structure
import { database } from '../dbconn/database.js';

async function verifySchema() {
    try {
        console.log('🔍 Verifying database schema...');

        // Check if driver_documents table exists and has correct structure
        console.log('\n📄 Checking driver_documents table...');
        const documentsTableCheck = await database.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'driver_documents' 
            ORDER BY ordinal_position;
        `);
        
        if (documentsTableCheck.rows.length === 0) {
            console.log('❌ driver_documents table does not exist!');
            return;
        }
        
        console.log('✅ driver_documents table structure:');
        documentsTableCheck.rows.forEach(row => {
            console.log(`  - ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
        });

        // Check if clients table has correct column names
        console.log('\n👥 Checking clients table columns...');
        const clientsTableCheck = await database.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'clients' 
            AND column_name IN ('first_name', 'last_name', 'contact_first_name', 'contact_last_name')
            ORDER BY column_name;
        `);
        
        console.log('✅ clients table name columns:');
        clientsTableCheck.rows.forEach(row => {
            console.log(`  - ${row.column_name}: ${row.data_type}`);
        });

        // Check if users table has required columns
        console.log('\n👤 Checking users table columns...');
        const usersTableCheck = await database.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name IN ('first_name', 'last_name', 'phone', 'address', 'city', 'country')
            ORDER BY column_name;
        `);
        
        console.log('✅ users table additional columns:');
        if (usersTableCheck.rows.length === 0) {
            console.log('  - No additional columns found (may need to run alterTable.js)');
        } else {
            usersTableCheck.rows.forEach(row => {
                console.log(`  - ${row.column_name}: ${row.data_type}`);
            });
        }

        // Check user_sessions table
        console.log('\n🔐 Checking user_sessions table...');
        const sessionsTableCheck = await database.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user_sessions' 
            ORDER BY ordinal_position;
        `);
        
        console.log('✅ user_sessions table structure:');
        sessionsTableCheck.rows.forEach(row => {
            console.log(`  - ${row.column_name}: ${row.data_type}`);
        });

        console.log('\n✅ Schema verification completed!');

    } catch (error) {
        console.error('❌ Schema verification failed:', error);
    } finally {
        process.exit(0);
    }
}

verifySchema().catch(console.error);

// Comprehensive database analysis for recruitment agency
import { database } from '../dbconn/database.js';

async function analyzeDatabase() {
    try {
        console.log('🔍 COMPREHENSIVE DATABASE ANALYSIS');
        console.log('=====================================\n');

        // Get all tables
        const tables = await database.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);

        console.log('📊 TABLES FOUND:', tables.rows.length);
        tables.rows.forEach(table => console.log(`  - ${table.table_name}`));

        // Analyze each table structure
        for (const table of tables.rows) {
            const tableName = table.table_name;
            console.log(`\n🏗️  TABLE: ${tableName.toUpperCase()}`);
            console.log('─'.repeat(50));

            // Get columns
            const columns = await database.query(`
                SELECT 
                    column_name, 
                    data_type, 
                    is_nullable,
                    column_default,
                    character_maximum_length
                FROM information_schema.columns 
                WHERE table_name = $1 
                ORDER BY ordinal_position;
            `, [tableName]);

            columns.rows.forEach(col => {
                const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
                const maxLength = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
                const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
                console.log(`  ${col.column_name}: ${col.data_type}${maxLength} ${nullable}${defaultVal}`);
            });

            // Get foreign keys
            const foreignKeys = await database.query(`
                SELECT
                    kcu.column_name,
                    ccu.table_name AS foreign_table_name,
                    ccu.column_name AS foreign_column_name
                FROM information_schema.table_constraints AS tc
                JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage AS ccu
                    ON ccu.constraint_name = tc.constraint_name
                    AND ccu.table_schema = tc.table_schema
                WHERE tc.constraint_type = 'FOREIGN KEY'
                    AND tc.table_name = $1;
            `, [tableName]);

            if (foreignKeys.rows.length > 0) {
                console.log('  🔗 FOREIGN KEYS:');
                foreignKeys.rows.forEach(fk => {
                    console.log(`    ${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
                });
            }

            // Get row count
            const count = await database.query(`SELECT COUNT(*) FROM ${tableName}`);
            console.log(`  📈 ROWS: ${count.rows[0].count}`);
        }

        // Analyze data relationships
        console.log('\n🔄 DATA RELATIONSHIPS ANALYSIS');
        console.log('═'.repeat(50));

        // Users by role
        const usersByRole = await database.query(`
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role 
            ORDER BY count DESC;
        `);
        console.log('👥 Users by Role:');
        usersByRole.rows.forEach(row => {
            console.log(`  ${row.role}: ${row.count} users`);
        });

        // Check for orphaned records
        console.log('\n🔍 ORPHANED RECORDS CHECK:');
        
        // Drivers without user records
        const orphanedDrivers = await database.query(`
            SELECT COUNT(*) as count 
            FROM drivers d 
            LEFT JOIN users u ON d.user_id = u.user_id 
            WHERE u.user_id IS NULL;
        `);
        console.log(`❌ Drivers without users: ${orphanedDrivers.rows[0].count}`);

        // Clients without user records
        const orphanedClients = await database.query(`
            SELECT COUNT(*) as count 
            FROM clients c 
            LEFT JOIN users u ON c.user_id = u.user_id 
            WHERE u.user_id IS NULL;
        `);
        console.log(`❌ Clients without users: ${orphanedClients.rows[0].count}`);

        // Documents without users
        const orphanedDocs = await database.query(`
            SELECT COUNT(*) as count 
            FROM driver_documents dd 
            LEFT JOIN users u ON dd.user_id = u.user_id 
            WHERE u.user_id IS NULL;
        `);
        console.log(`❌ Documents without users: ${orphanedDocs.rows[0].count}`);

        // Profile completeness analysis
        console.log('\n📋 PROFILE COMPLETENESS:');
        
        const driverCompleteness = await database.query(`
            SELECT 
                COUNT(*) as total_drivers,
                COUNT(d.license_number) as has_license,
                COUNT(d.experience_years) as has_experience,
                COUNT(u.phone) as has_phone,
                COUNT(u.address) as has_address
            FROM users u
            LEFT JOIN drivers d ON u.user_id = d.user_id
            WHERE u.role = 'driver';
        `);
        
        if (driverCompleteness.rows.length > 0) {
            const stats = driverCompleteness.rows[0];
            console.log('🚛 Driver Profile Completeness:');
            console.log(`  Total drivers: ${stats.total_drivers}`);
            console.log(`  Has license: ${stats.has_license}/${stats.total_drivers} (${Math.round(stats.has_license/stats.total_drivers*100)}%)`);
            console.log(`  Has experience: ${stats.has_experience}/${stats.total_drivers} (${Math.round(stats.has_experience/stats.total_drivers*100)}%)`);
            console.log(`  Has phone: ${stats.has_phone}/${stats.total_drivers} (${Math.round(stats.has_phone/stats.total_drivers*100)}%)`);
            console.log(`  Has address: ${stats.has_address}/${stats.total_drivers} (${Math.round(stats.has_address/stats.total_drivers*100)}%)`);
        }

        console.log('\n✅ DATABASE ANALYSIS COMPLETE!');

    } catch (error) {
        console.error('❌ Analysis failed:', error);
    } finally {
        process.exit(0);
    }
}

analyzeDatabase().catch(console.error);

import { database } from '../dbconn/database.js';

async function testLocalDatabase() {
    try {
        console.log('🔍 Testing database connection and schema...');
        
        // Test basic connection
        const timeResult = await database.query('SELECT NOW() as current_time');
        console.log('✅ Database connected:', timeResult.rows[0].current_time);
        
        // Check if our new schema exists
        console.log('🔍 Checking if users table exists...');
        const tableCheck = await database.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'drivers', 'clients', 'user_sessions')
        `);
        
        console.log('📊 Found tables:', tableCheck.rows.map(r => r.table_name));
        
        if (tableCheck.rows.length === 0) {
            console.log('❌ New schema tables not found! Migration may not have run on this database.');
            return;
        }
        
        // Check if demo users exist
        console.log('👥 Checking for demo users...');
        const userCheck = await database.query('SELECT email, role FROM users LIMIT 5');
        console.log('👥 Found users:', userCheck.rows);
        
        // Test specific admin user
        console.log('👨‍💼 Testing admin user lookup...');
        const adminCheck = await database.query(
            'SELECT user_id, email, role, password_hash FROM users WHERE email = $1',
            ['admin@logistics.com']
        );
        
        if (adminCheck.rows.length > 0) {
            console.log('✅ Admin user found:', {
                user_id: adminCheck.rows[0].user_id,
                email: adminCheck.rows[0].email,
                role: adminCheck.rows[0].role,
                has_password: !!adminCheck.rows[0].password_hash
            });
        } else {
            console.log('❌ Admin user not found!');
        }
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        console.error('Connection string being used:', process.env.DATABASE_URL || 'fallback connection');
    }
}

testLocalDatabase();

import { database } from '../dbconn/database.js';
import bcrypt from 'bcrypt';

async function testLogin() {
    try {
        console.log('🔍 Testing login functionality...');
        
        // 1. Test database connection
        console.log('📡 Testing database connection...');
        const timeResult = await database.query('SELECT NOW() as current_time');
        console.log('✅ Database connected:', timeResult.rows[0].current_time);
        
        // 2. Check if users table exists and has demo data
        console.log('👥 Checking users table...');
        const usersResult = await database.query('SELECT COUNT(*) FROM users');
        console.log(`📊 Users in database: ${usersResult.rows[0].count}`);
        
        // 3. Check if admin user exists
        console.log('👨‍💼 Looking for admin user...');
        const adminResult = await database.query(
            'SELECT user_id, email, role FROM users WHERE email = $1',
            ['admin@logistics.com']
        );
        
        if (adminResult.rows.length > 0) {
            console.log('✅ Admin user found:', adminResult.rows[0]);
            
            // 4. Test password verification
            console.log('🔐 Testing password verification...');
            const userWithPassword = await database.query(
                'SELECT password_hash FROM users WHERE email = $1',
                ['admin@logistics.com']
            );
            
            const isValidPassword = await bcrypt.compare('demo123', userWithPassword.rows[0].password_hash);
            console.log('🔑 Password verification result:', isValidPassword);
            
            if (isValidPassword) {
                console.log('✅ Password verification successful!');
            } else {
                console.log('❌ Password verification failed!');
                console.log('Expected password: demo123');
                console.log('Stored hash:', userWithPassword.rows[0].password_hash);
            }
        } else {
            console.log('❌ Admin user not found!');
            
            // Check what users exist
            const allUsers = await database.query('SELECT email, role FROM users LIMIT 5');
            console.log('Available users:', allUsers.rows);
        }
        
        // 5. Check user_sessions table
        console.log('🔗 Checking user_sessions table...');
        const sessionsResult = await database.query('SELECT COUNT(*) FROM user_sessions');
        console.log(`📊 Sessions in database: ${sessionsResult.rows[0].count}`);
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await database.end();
    }
}

testLogin();

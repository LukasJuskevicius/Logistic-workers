// Check if user has driver record
import { database } from '../dbconn/database.js';

async function checkUserDriver() {
    try {
        console.log('🔍 Checking user and driver records...');

        // Get all users
        const users = await database.query('SELECT user_id, email, role FROM users ORDER BY created_at DESC LIMIT 5');
        console.log('\n👥 Recent users:');
        users.rows.forEach(user => {
            console.log(`  - ${user.email} (${user.role}) - ID: ${user.user_id}`);
        });

        // Check if users have driver records
        for (const user of users.rows) {
            if (user.role === 'driver') {
                const driverCheck = await database.query(
                    'SELECT user_id, first_name, last_name FROM drivers WHERE user_id = $1',
                    [user.user_id]
                );
                
                if (driverCheck.rows.length === 0) {
                    console.log(`❌ Driver ${user.email} has NO driver record!`);
                } else {
                    console.log(`✅ Driver ${user.email} has driver record: ${driverCheck.rows[0].first_name} ${driverCheck.rows[0].last_name}`);
                }
            }
        }

        // Check active sessions
        const sessions = await database.query(
            'SELECT us.session_token, us.user_id, u.email FROM user_sessions us JOIN users u ON us.user_id = u.user_id WHERE us.is_active = true ORDER BY us.created_at DESC LIMIT 3'
        );
        
        console.log('\n🔐 Active sessions:');
        sessions.rows.forEach(session => {
            console.log(`  - ${session.email} - Session: ${session.session_token.substring(0, 8)}...`);
        });

    } catch (error) {
        console.error('❌ Check failed:', error);
    } finally {
        process.exit(0);
    }
}

checkUserDriver().catch(console.error);

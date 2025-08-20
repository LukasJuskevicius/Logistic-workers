import { database } from '../dbconn/database.js';

async function updatePasswordHashes() {
    try {
        console.log('🔧 Updating password hashes in database...');
        
        // The correct bcrypt hash for password 'demo123'
        const correctHash = '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO';
        
        // Update all users to use the correct password hash
        const result = await database.query(
            'UPDATE users SET password_hash = $1',
            [correctHash]
        );
        
        console.log(`✅ Updated ${result.rowCount} user password hashes`);
        
        // Verify the admin user specifically
        const adminCheck = await database.query(
            'SELECT email, password_hash FROM users WHERE email = $1',
            ['admin@logistics.com']
        );
        
        if (adminCheck.rows.length > 0) {
            console.log('👤 Admin user verified:');
            console.log('   Email:', adminCheck.rows[0].email);
            console.log('   Hash updated:', adminCheck.rows[0].password_hash === correctHash);
        }
        
        console.log('✅ Password hash update completed successfully!');
        
    } catch (error) {
        console.error('❌ Failed to update password hashes:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await database.end();
    }
}

updatePasswordHashes();

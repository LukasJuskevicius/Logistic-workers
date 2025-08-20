import bcrypt from 'bcrypt';
import { database } from '../dbconn/database.js';

async function checkPasswordHash() {
    try {
        console.log('🔍 Checking password hash in database...');
        
        // Get the admin user's stored hash
        const result = await database.query(
            'SELECT email, password_hash FROM users WHERE email = $1', 
            ['admin@logistics.com']
        );
        
        if (result.rows.length === 0) {
            console.log('❌ Admin user not found');
            return;
        }
        
        const user = result.rows[0];
        console.log('👤 Admin user email:', user.email);
        console.log('🔑 Stored hash:', user.password_hash);
        console.log('🔑 Hash length:', user.password_hash ? user.password_hash.length : 0);
        console.log('🔑 Hash starts with:', user.password_hash ? user.password_hash.substring(0, 10) : 'NULL');
        
        // Check if it looks like a proper bcrypt hash
        const bcryptPattern = /^\$2[aby]\$\d{1,2}\$.{53}$/;
        const isValidBcryptFormat = bcryptPattern.test(user.password_hash);
        console.log('🔍 Is valid bcrypt format:', isValidBcryptFormat);
        
        // Test password verification with current hash
        const testPassword = 'demo123';
        console.log('\n🧪 Testing password verification...');
        console.log('🧪 Test password:', testPassword);
        
        try {
            const isValid = await bcrypt.compare(testPassword, user.password_hash);
            console.log('✅ Password verification result:', isValid);
        } catch (compareError) {
            console.log('❌ Password comparison failed:', compareError.message);
        }
        
        // Generate a new proper bcrypt hash for comparison
        console.log('\n🔧 Generating new proper bcrypt hash...');
        const newHash = await bcrypt.hash(testPassword, 10);
        console.log('🔑 New hash:', newHash);
        console.log('🔑 New hash length:', newHash.length);
        
        // Test the new hash
        const newHashValid = await bcrypt.compare(testPassword, newHash);
        console.log('✅ New hash verification:', newHashValid);
        
        if (!isValidBcryptFormat || !await bcrypt.compare(testPassword, user.password_hash)) {
            console.log('\n🔧 FIXING: Updating admin user with correct password hash...');
            
            await database.query(
                'UPDATE users SET password_hash = $1 WHERE email = $2',
                [newHash, 'admin@logistics.com']
            );
            
            console.log('✅ Admin password hash updated successfully!');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await database.end();
    }
}

checkPasswordHash();

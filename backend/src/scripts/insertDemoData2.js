// src/scripts/insertDemoData2.js
console.log('📝 Adding profiles and messages to existing users...');
import { database } from '../dbconn/database.js';

async function insertAdditionalData() {
  try {
    await database.query('begin;');
    
    // 1. Get existing users from database
    const users = await database.query(`
      SELECT user_id, email, role FROM users
    `);
    console.log(`Found ${users.rows.length} existing users`);
    
    // 2. Add user profiles for existing users
    try {
      const profileData = {
        'lukasjuskevicius18@gmail.com': {
          picture: '/avatars/avatar1.png',
          bio: 'System Administrator - Managing logistics platform',
          location: 'Vilnius',
          phone: '+370 612345678'
        },
        'paulius.my25@gmail.com': {
          picture: '/avatars/avatar2.png', 
          bio: 'Professional driver with 5+ years experience',
          location: 'Kaunas',
          phone: '+370 623456789'
        },
        'jonasjuskevicius18@gmail.com': {
          picture: '/avatars/avatar3.png',
          bio: 'Logistics company owner',
          location: 'Klaipeda',
          phone: '+370 634567890'
        }
      };
      
      for (const user of users.rows) {
        const profile = profileData[user.email] || {
          picture: '/avatars/default.png',
          bio: 'Logistics professional',
          location: 'Lithuania',
          phone: null
        };
        
        await database.query(`
          INSERT INTO user_profiles (user_id, profile_picture, bio, location, phone)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (user_id) DO UPDATE SET
            profile_picture = EXCLUDED.profile_picture,
            bio = EXCLUDED.bio,
            location = EXCLUDED.location,
            phone = EXCLUDED.phone,
            updated_at = NOW()
        `, [user.user_id, profile.picture, profile.bio, profile.location, profile.phone]);
      }
      console.log('✅ User profiles created/updated');
    } catch (error) {
      console.error('❌ Profile insert failed:', error.message);
      throw error;
    }
    
    // 3. Add sample messages
    try {
      const lukas = users.rows.find(u => u.email === 'lukasjuskevicius18@gmail.com');
      const paulius = users.rows.find(u => u.email === 'paulius.my25@gmail.com');
      const jonas = users.rows.find(u => u.email === 'jonasjuskevicius18@gmail.com');
      
      // Admin to Driver message
      if (lukas && paulius) {
        await database.query(`
          INSERT INTO messages (sender_id, receiver_id, subject, content, is_admin_message)
          VALUES ($1, $2, $3, $4, true)
        `, [
          lukas.user_id,
          paulius.user_id,
          'Account Verification Complete',
          'Your driver account has been verified. You can now accept delivery requests.'
        ]);
      }
      
      // Client to Driver message
      if (jonas && paulius) {
        await database.query(`
          INSERT INTO messages (sender_id, receiver_id, subject, content)
          VALUES ($1, $2, $3, $4)
        `, [
          jonas.user_id,
          paulius.user_id,
          'Delivery Request - Vilnius to Kaunas',
          'I need a driver for a shipment tomorrow at 10 AM. Please confirm availability.'
        ]);
      }
      
      // Driver to Admin message
      if (paulius && lukas) {
        await database.query(`
          INSERT INTO messages (sender_id, receiver_id, subject, content)
          VALUES ($1, $2, $3, $4)
        `, [
          paulius.user_id,
          lukas.user_id,
          'License Update',
          'I have uploaded my renewed driving license. Please verify.'
        ]);
      }
      
      console.log('✅ Sample messages created');
    } catch (error) {
      console.error('❌ Messages insert failed:', error.message);
      throw error;
    }
    
    await database.query('commit;');
    console.log('✅ All additional data inserted successfully!');
    
  } catch (error) {
    await database.query('rollback;');
    console.error('❌ Transaction rolled back:', error);
  } finally {
    await database.end();
  }
}

insertAdditionalData().catch(console.error);
// src/scripts/insertDemoData.js
console.log('📝 Inserting demo data...');
import { database } from '../dbconn/database.js';
import bcrypt from 'bcrypt';

async function insertDemoData() {
  try {
    await database.query('begin;');
    
    // 1. Users
    try {
      const demoPassword = 'demo123';
      const passwordHash = await bcrypt.hash(demoPassword, 10);
      const lukasPass = 'FuckOff123*@';
      const lukasHash = await bcrypt.hash(lukasPass, 10);
      const users = await database.query(`
        INSERT INTO users (email, password_hash, role, is_verified) VALUES
        ('lukasjuskevicius18@gmail.com', $2, 'admin', true),
        ('paulius.my25@gmail.com', $1, 'driver', true),
        ('jonasjuskevicius18@gmail.com', $1, 'client', true),
        ('john.driver@logistics.com', $1, 'driver', true),
        ('sarah.wilson@logistics.com', $1, 'driver', true),
        ('mike.transport@company.com', $1, 'client', true),
        ('emma.logistics@firm.com', $1, 'client', true),
        ('david.truck@logistics.com', $1, 'driver', true),
        ('lisa.admin@logistics.com', $1, 'admin', true)
        RETURNING user_id, email, role;
      `, [passwordHash, lukasHash]);
      console.log('✅ Users created:', users.rows.length);
      
      // 2. Admin Profiles
      try {
        const adminUsers = users.rows.filter(u => u.role === 'admin');
        for (const admin of adminUsers) {
          const names = {
            'lukasjuskevicius18@gmail.com': ['Lukas', 'Juskevicius'],
            'lisa.admin@logistics.com': ['Lisa', 'Anderson']
          };
          const [first, last] = names[admin.email] || ['Admin', 'User'];
          await database.query(`
            INSERT INTO admins (user_id, first_name, last_name) VALUES ($1, $2, $3)
          `, [admin.user_id, first, last]);
        }
        console.log('✅ Admin profiles created');
      } catch (error) {
        console.error('❌ Admin insert failed:', error.message);
        throw error;
      }

      // 3. Driver Profiles
      try {
        const driverUsers = users.rows.filter(u => u.role === 'driver');
        const driverNames = {
          'paulius.my25@gmail.com': ['Paulius', 'Mykolaitis'],
          'john.driver@logistics.com': ['John', 'Smith'],
          'sarah.wilson@logistics.com': ['Sarah', 'Wilson'],
          'david.truck@logistics.com': ['David', 'Brown']
        };
        for (const driver of driverUsers) {
          const [first, last] = driverNames[driver.email] || ['Driver', 'User'];
          await database.query(`
            INSERT INTO drivers (user_id, first_name, last_name, experience_years) VALUES ($1, $2, $3, $4)
          `, [driver.user_id, first, last, Math.floor(Math.random() * 10) + 1]);
        }
        console.log('✅ Driver profiles created');
      } catch (error) {
        console.error('❌ Driver insert failed:', error.message);
        throw error;
      }

      // 4. Client Profiles
      try {
        const clientUsers = users.rows.filter(u => u.role === 'client');
        const clientData = {
          'jonasjuskevicius18@gmail.com': ['Jonas', 'Juskevicius', 'Jonas Transport'],
          'mike.transport@company.com': ['Mike', 'Johnson', 'Johnson Logistics'],
          'emma.logistics@firm.com': ['Emma', 'Davis', 'Davis & Co Transport']
        };
        for (const client of clientUsers) {
          const [first, last, company] = clientData[client.email] || ['Client', 'User', 'Company'];
          await database.query(`
            INSERT INTO clients (user_id, contact_first_name, contact_last_name, company_name) VALUES ($1, $2, $3, $4)
          `, [client.user_id, first, last, company]);
        }
        console.log('✅ Client profiles created');
      } catch (error) {
        console.error('❌ Client insert failed:', error.message);
        throw error;
      }

      // 5. User Profiles with avatars
      try {
        for (let i = 0; i < users.rows.length; i++) {
          const user = users.rows[i];
          const avatars = [
            '/avatars/avatar1.png', '/avatars/avatar2.png', '/avatars/avatar3.png',
            '/avatars/avatar4.png', '/avatars/avatar5.png', '/avatars/avatar6.png'
          ];
          const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
          
          await database.query(`
            INSERT INTO user_profiles (user_id, profile_picture, bio, location) 
            VALUES ($1, $2, $3, $4)
          `, [user.user_id, avatars[i % avatars.length], 
              `Professional in logistics industry`, 
              locations[i % locations.length]]);
        }
        console.log('✅ User profiles with avatars created');
      } catch (error) {
        console.error('❌ User profiles insert failed:', error.message);
        throw error;
      }
            
        await database.query('commit;');
        console.log('✅ All demo data inserted!');
    } catch (error) {
      console.error('❌ User insert failed:', error.message);
      throw error;
    }
  } catch (error) {
    await database.query('rollback;');
    console.error('❌ Transaction rolled back');
  } finally {
    await database.end();
  }
}

insertDemoData();

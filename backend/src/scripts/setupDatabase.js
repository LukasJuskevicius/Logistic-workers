// src/scripts/setupDatabase.js
console.log('Setting up database...');
import { database } from '../dbconn/database.js';

async function createTables() {
    try {
        console.log('🗄️ Creating database tables...');
        await database.query(`begin;`);
        // 1. Users table
        await database.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT CHECK (role IN ('driver', 'client', 'admin')) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_verified BOOLEAN DEFAULT false,
        is_banned BOOLEAN DEFAULT false,
        last_login TIMESTAMP WITH TIME ZONE
    );
    `);
        
        // 2. User sessions table
        // ip address and user agent suspicious activity detection
        await database.query(`
    CREATE TABLE IF NOT EXISTS user_sessions (
        session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        session_token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address INET,
        user_agent TEXT,
        is_active BOOLEAN DEFAULT true
    );
    `);
        
        // 3. Drivers table
        await database.query(`
    CREATE TABLE IF NOT EXISTS drivers (
        user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        license_number TEXT,
        license_categories TEXT[] DEFAULT '{}',
        experience_years INTEGER,
        medical_cert_expires DATE,
        preferred_routes TEXT,
        availability JSONB,
        address TEXT,
        profile_picture_url TEXT,
        bio TEXT,
        hourly_rate DECIMAL(10,2),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `);
        
        // 4. Clients table
        await database.query(`
    CREATE TABLE IF NOT EXISTS clients (
        user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
        contact_first_name TEXT NOT NULL,
        contact_last_name TEXT NOT NULL,
        phone TEXT,
        company_name TEXT NOT NULL,
        company_registration TEXT,
        vat_number TEXT,
        industry_type TEXT,
        fleet_size INTEGER,
        company_address TEXT,
        billing_address TEXT,
        company_website TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `);
        
        // 5. Admins table
        await database.query(`
    CREATE TABLE IF NOT EXISTS admins (
        user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        department TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `);
        
        // 6. Messages table
        await database.query(`
    CREATE TABLE IF NOT EXISTS messages (
        message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sender_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        receiver_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        subject TEXT,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        is_admin_message BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `);
        
        // 7. User profiles table (additional info)
        await database.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
        user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
        profile_picture TEXT DEFAULT '/avatars/default.png',
        bio TEXT,
        skills TEXT[],
        location TEXT,
        phone TEXT,
        linkedin TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `);
        
        await database.query(`commit;`);
        console.log('✅ All tables created successfully!');
    } catch (error) {
        await database.query(`rollback;`);
        console.error('❌ Error creating tables:', error);
    } finally {
        await database.end();
    }
}

// Call the function
createTables().catch(console.error);

import { supabase } from '../config/supabase.js';

export async function createMissingTables() {
  console.log('🗄️  Creating missing tables...');

  try {
    // Check if tables exist
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) {
      console.error('❌ Error checking tables:', error);
      return;
    }

    const existingTables = tables.map(t => t.table_name);
    console.log('📋 Existing tables:', existingTables);

    // Create missing tables if they don't exist
    const requiredTables = ['users', 'vacancies', 'job_applications', 'contact_messages', 'testimonials'];
    
    for (const table of requiredTables) {
      if (!existingTables.includes(table)) {
        console.log(`🔨 Creating table: ${table}`);
        
        // Create table based on name
        switch (table) {
          case 'users':
            await createUsersTable();
            break;
          case 'vacancies':
            await createVacanciesTable();
            break;
          case 'job_applications':
            await createJobApplicationsTable();
            break;
          case 'contact_messages':
            await createContactMessagesTable();
            break;
          case 'testimonials':
            await createTestimonialsTable();
            break;
        }
      } else {
        console.log(`✅ Table ${table} already exists`);
      }
    }

    console.log('🎉 Table creation completed!');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

async function createUsersTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID REFERENCES auth.users(id) PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        type TEXT CHECK (type IN ('driver', 'client', 'admin')) DEFAULT 'driver',
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        company_name TEXT,
        license_number TEXT,
        experience_years INTEGER,
        address TEXT,
        nationality TEXT,
        license_categories TEXT[],
        languages JSONB,
        preferred_routes TEXT,
        availability TEXT,
        certifications TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (error) {
    console.error('❌ Error creating users table:', error);
  } else {
    console.log('✅ Users table created');
  }
}

async function createVacanciesTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.vacancies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        salary TEXT,
        type TEXT DEFAULT 'Full-time',
        requirements TEXT[],
        description TEXT,
        status TEXT DEFAULT 'active',
        deadline DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (error) {
    console.error('❌ Error creating vacancies table:', error);
  } else {
    console.log('✅ Vacancies table created');
  }
}

async function createJobApplicationsTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.job_applications (
        id SERIAL PRIMARY KEY,
        vacancy_id INTEGER REFERENCES public.vacancies(id) ON DELETE CASCADE,
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
        cover_letter TEXT,
        resume_url TEXT,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        reviewed_at TIMESTAMP WITH TIME ZONE,
        reviewed_by UUID REFERENCES public.users(id)
      );
    `
  });

  if (error) {
    console.error('❌ Error creating job_applications table:', error);
  } else {
    console.log('✅ Job applications table created');
  }
}

async function createContactMessagesTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (error) {
    console.error('❌ Error creating contact_messages table:', error);
  } else {
    console.log('✅ Contact messages table created');
  }
}

async function createTestimonialsTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        company TEXT,
        content TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (error) {
    console.error('❌ Error creating testimonials table:', error);
  } else {
    console.log('✅ Testimonials table created');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createMissingTables().then(() => {
    console.log('✅ Table creation script completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Table creation script failed:', error);
    process.exit(1);
  });
} 
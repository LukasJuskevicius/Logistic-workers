import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to check if database tables exist
export async function checkDatabaseTables() {
  try {
    console.log('🔍 Checking database tables...');
    
    // Check if users table exists
    const { data: usersTable, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Users table not found or not accessible');
      return false;
    }
    
    // Check if vacancies table exists
    const { data: vacanciesTable, error: vacanciesError } = await supabase
      .from('vacancies')
      .select('count')
      .limit(1);
    
    if (vacanciesError) {
      console.log('❌ Vacancies table not found or not accessible');
      return false;
    }
    
    // Check if job_applications table exists
    const { data: applicationsTable, error: applicationsError } = await supabase
      .from('job_applications')
      .select('count')
      .limit(1);
    
    if (applicationsError) {
      console.log('❌ Job applications table not found or not accessible');
      return false;
    }
    
    // Check if contact_messages table exists
    const { data: contactTable, error: contactError } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);
    
    if (contactError) {
      console.log('❌ Contact messages table not found or not accessible');
      return false;
    }
    
    // Check if testimonials table exists
    const { data: testimonialsTable, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('count')
      .limit(1);
    
    if (testimonialsError) {
      console.log('❌ Testimonials table not found or not accessible');
      return false;
    }
    
    console.log('✅ All database tables are accessible');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking database tables:', error);
    return false;
  }
}

// Function to get table counts
export async function getDatabaseStats() {
  try {
    const [usersCount, vacanciesCount, applicationsCount, contactCount, testimonialsCount] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('vacancies').select('*', { count: 'exact', head: true }),
      supabase.from('job_applications').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true })
    ]);
    
    return {
      users: usersCount.count || 0,
      vacancies: vacanciesCount.count || 0,
      applications: applicationsCount.count || 0,
      contactMessages: contactCount.count || 0,
      testimonials: testimonialsCount.count || 0
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
} 
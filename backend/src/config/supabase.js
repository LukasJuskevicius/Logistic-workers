import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../../.env');

console.log('🔧 Path debugging:');
console.log('__filename:', __filename);
console.log('__dirname:', __dirname);
console.log('envPath:', envPath);

dotenv.config({ path: envPath });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔧 Environment check:');
console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mock data for development when database tables don't exist
const mockData = {
  users: [
    {
      id: '1',
      email: 'driver@example.com',
      first_name: 'John',
      last_name: 'Driver',
      type: 'driver',
      phone: '+37060000001',
      is_verified: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'client@example.com',
      first_name: 'Jane',
      last_name: 'Client',
      type: 'client',
      phone: '+37060000002',
      is_verified: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  vacancies: [
    {
      id: '1',
      title: 'Truck Driver - International Routes',
      company: 'LogiTrans Ltd',
      location: 'Vilnius, Lithuania',
      salary: '€2500-3500/month',
      type: 'full-time',
      requirements: ['C license', '3+ years experience', 'English language'],
      description: 'We are looking for experienced truck drivers for international routes across Europe.',
      posted_date: '2024-01-15T00:00:00Z',
      deadline: '2024-02-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Delivery Driver - Local Routes',
      company: 'FastDelivery',
      location: 'Kaunas, Lithuania',
      salary: '€1800-2200/month',
      type: 'full-time',
      requirements: ['B license', '1+ year experience', 'Lithuanian language'],
      description: 'Local delivery driver needed for package delivery in Kaunas area.',
      posted_date: '2024-01-10T00:00:00Z',
      deadline: '2024-02-10T00:00:00Z'
    }
  ]
};

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
      console.log('🔄 Using mock data for development');
      return false;
    }
    
    // Check if vacancies table exists
    const { data: vacanciesTable, error: vacanciesError } = await supabase
      .from('vacancies')
      .select('count')
      .limit(1);
    
    if (vacanciesError) {
      console.log('❌ Vacancies table not found or not accessible');
      console.log('🔄 Using mock data for development');
      return false;
    }
    
    // Check if job_applications table exists
    const { data: applicationsTable, error: applicationsError } = await supabase
      .from('job_applications')
      .select('count')
      .limit(1);
    
    if (applicationsError) {
      console.log('❌ Job applications table not found or not accessible');
      console.log('🔄 Using mock data for development');
      return false;
    }
    
    // Check if contact_messages table exists
    const { data: contactTable, error: contactError } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);
    
    if (contactError) {
      console.log('❌ Contact messages table not found or not accessible');
      console.log('🔄 Using mock data for development');
      return false;
    }
    
    // Check if testimonials table exists
    const { data: testimonialsTable, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('count')
      .limit(1);
    
    if (testimonialsError) {
      console.log('❌ Testimonials table not found or not accessible');
      console.log('🔄 Using mock data for development');
      return false;
    }
    
    console.log('✅ All database tables are accessible');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking database tables:', error);
    console.log('🔄 Using mock data for development');
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
    // Return mock stats when database is not available
    return {
      users: mockData.users.length,
      vacancies: mockData.vacancies.length,
      applications: 0,
      contactMessages: 0,
      testimonials: 0
    };
  }
}

// Function to get mock data
export function getMockData() {
  return mockData;
} 
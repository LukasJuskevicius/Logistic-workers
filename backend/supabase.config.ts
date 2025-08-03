// Supabase configuration and clients
import { createClient } from 'npm:@supabase/supabase-js@2';

// Validate environment variables
export function validateConfig(): boolean {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_ANON_KEY'
  ];

  for (const varName of requiredVars) {
    if (!Deno.env.get(varName)) {
      console.error(`❌ Missing required environment variable: ${varName}`);
      return false;
    }
  }

  console.log('✅ Supabase configuration validated');
  return true;
}

// Admin client for server operations
export const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// User client for authentication
export const supabaseUser = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
);

export const config = {
  supabaseUrl: Deno.env.get('SUPABASE_URL')!,
  serviceRoleKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  anonKey: Deno.env.get('SUPABASE_ANON_KEY')!,
};
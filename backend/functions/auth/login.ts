import { Hono } from 'npm:hono@4.0.0';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { loginSchema } from '../../database/schemas/auth.ts';
import * as kv from '../../database/kv-store.ts';

const app = new Hono();

const supabaseUser = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
);

app.post('/login', async (c) => {
  try {
    // Validate request body
    const body = await c.req.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      }, 400);
    }

    const { email, password } = validation.data;

    console.log(`=== LOGIN ATTEMPT ===`);
    console.log(`Email: ${email}`);

    // Authenticate with Supabase
    const { data, error } = await supabaseUser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Authentication failed:', error.message);
      
      let errorMessage = 'Invalid email or password';
      if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please confirm your email before logging in';
      } else if (error.message.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please try again later';
      }
      
      return c.json({
        success: false,
        error: errorMessage
      }, 401);
    }

    if (!data.session?.access_token) {
      return c.json({
        success: false,
        error: 'Login failed - no session created'
      }, 401);
    }

    // Get user profile
    const userId = data.user.id;
    const userProfile = await getUserProfile(userId);

    if (!userProfile) {
      return c.json({
        success: false,
        error: 'User profile not found. Please contact support.'
      }, 404);
    }

    console.log(`Login successful: ${email} (${userProfile.type})`);
    
    return c.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userProfile,
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token
        }
      }
    });

  } catch (error) {
    console.error('Login server error:', error);
    return c.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
});

async function getUserProfile(userId: string) {
  const userTypes = ['admin', 'driver', 'client'];
  
  for (const type of userTypes) {
    const profile = await kv.get(`${type}:${userId}`);
    if (profile) {
      return JSON.parse(profile);
    }
  }
  
  return null;
}

export default app;
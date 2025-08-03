import { createClient } from 'npm:@supabase/supabase-js@2';
import { Hono } from 'npm:hono@4.0.0';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enhanced sample user creation with better error handling and existence checking
async function createSampleUsers() {
  try {
    console.log('=== CHECKING AND CREATING SAMPLE USERS ===');
    console.log('Supabase URL:', Deno.env.get('SUPABASE_URL'));
    console.log('Service Role Key exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    
    const users = [
      {
        email: 'lukasjusekvicius18@gmail.com',
        password: 'Karatistas123*',
        type: 'admin',
        metadata: {
          name: 'Lukas Jusekvicius',
          type: 'admin',
          role: 'administrator'
        },
        profile: {
          user_id: '',
          type: 'admin',
          name: 'Lukas Jusekvicius',
          email: 'lukasjusekvicius18@gmail.com',
          role: 'administrator',
          created_at: new Date().toISOString()
        }
      },
      {
        email: '92plmqaz@gmail.com',
        password: 'Karatistas123*',
        type: 'driver',
        metadata: {
          name: 'Sample Driver',
          type: 'driver',
          nationality: 'Lithuanian',
          phone: '+370 600 12345'
        },
        profile: {
          user_id: '',
          type: 'driver',
          full_name: 'Sample Driver',
          email: '92plmqaz@gmail.com',
          phone: '+370 600 12345',
          nationality: 'Lithuanian',
          status: 'verified',
          profile_complete: true,
          created_at: new Date().toISOString()
        }
      },
      {
        email: 'paul.my25@gmail.com',
        password: 'Karatistas123*',
        type: 'client',
        metadata: {
          name: 'Paul MyCompany',
          type: 'client',
          company: 'Sample Transport Ltd',
          registration_number: 'REG123456',
          phone: '+31 6 12345678',
          address: 'Amsterdam, Netherlands'
        },
        profile: {
          user_id: '',
          type: 'client',
          company_name: 'Sample Transport Ltd',
          registration_number: 'REG123456',
          contact_name: 'Paul MyCompany',
          email: 'paul.my25@gmail.com',
          phone: '+31 6 12345678',
          address: 'Amsterdam, Netherlands',
          status: 'verified',
          created_at: new Date().toISOString()
        }
      }
    ];

    for (const userData of users) {
      try {
        console.log(`\n--- Checking ${userData.type} user: ${userData.email} ---`);
        
        // First, check if user already exists in Supabase Auth
        const { data: existingUser, error: checkError } = await supabase.auth.admin.getUserByEmail(userData.email);
        
        if (existingUser?.user?.id) {
          console.log(`User ${userData.email} already exists in Supabase Auth with ID: ${existingUser.user.id}`);
          
          // Check if profile exists in KV store
          const kvProfile = await kv.get(`${userData.type}:${existingUser.user.id}`);
          if (!kvProfile) {
            console.log(`Profile missing in KV store for ${userData.email}, creating...`);
            // Store profile in KV store
            userData.profile.user_id = existingUser.user.id;
            await kv.set(`${userData.type}:${existingUser.user.id}`, JSON.stringify(userData.profile));
            await kv.set(`${userData.type}_by_email:${userData.email}`, existingUser.user.id);
            console.log(`Created KV profile for existing user: ${userData.email}`);
          } else {
            console.log(`User ${userData.email} already has complete profile`);
          }
          continue;
        }
        
        console.log(`User ${userData.email} does not exist, creating...`);
        
        // Create new user
        const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          user_metadata: userData.metadata,
          email_confirm: true
        });
        
        if (authError) {
          // Handle the case where user exists but getUserByEmail didn't find them
          if (authError.code === 'email_exists' || authError.message.includes('already been registered')) {
            console.log(`User ${userData.email} exists but wasn't found by getUserByEmail, skipping creation`);
            continue;
          }
          
          console.error(`Failed to create ${userData.type} user ${userData.email}:`, authError);
          console.error('Auth error details:', {
            message: authError.message,
            status: authError.status,
            code: authError.code
          });
          continue;
        }
        
        if (!newUser?.user?.id) {
          console.error(`No user ID returned for ${userData.email}`);
          continue;
        }

        console.log(`Successfully created user: ${userData.email} with ID: ${newUser.user.id}`);
        
        // Store in KV store
        userData.profile.user_id = newUser.user.id;
        await kv.set(`${userData.type}:${newUser.user.id}`, JSON.stringify(userData.profile));
        await kv.set(`${userData.type}_by_email:${userData.email}`, newUser.user.id);
        
        console.log(`Stored profile in KV store for: ${userData.email}`);
        
      } catch (error) {
        console.error(`Error processing user ${userData.email}:`, error);
        console.error('Error stack:', error.stack);
      }
    }
    
    console.log('=== SAMPLE USERS CHECK/CREATION COMPLETED ===');
  } catch (error) {
    console.error('=== CRITICAL ERROR IN SAMPLE USERS CREATION ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
  }
}

// Create sample users on startup only if needed
createSampleUsers();

// Health check
app.get('/make-server-8675f3cb/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Comprehensive debug endpoint to check all user statuses
app.get('/make-server-8675f3cb/debug/users', async (c) => {
  try {
    console.log('=== DEBUG USERS ENDPOINT CALLED ===');
    
    const users = ['lukasjusekvicius18@gmail.com', '92plmqaz@gmail.com', 'paul.my25@gmail.com'];
    const results = {};
    
    for (const email of users) {
      try {
        console.log(`\nChecking user: ${email}`);
        
        // Check Supabase auth
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(email);
        console.log(`Auth check for ${email}:`, authUser ? 'FOUND' : 'NOT FOUND');
        if (authError) {
          console.log(`Auth error for ${email}:`, authError);
        }
        
        // Check KV store
        const userType = email === 'lukasjusekvicius18@gmail.com' ? 'admin' : 
                         email === '92plmqaz@gmail.com' ? 'driver' : 'client';
        
        const kvUserId = await kv.get(`${userType}_by_email:${email}`);
        console.log(`KV store ID for ${email}:`, kvUserId || 'NOT FOUND');
        
        let kvProfile = null;
        if (kvUserId) {
          kvProfile = await kv.get(`${userType}:${kvUserId}`);
          console.log(`KV profile for ${email}:`, kvProfile ? 'FOUND' : 'NOT FOUND');
        }
        
        // Test login capability
        let loginTest = null;
        try {
          const userSupabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!,
          );
          
          const { data: loginData, error: loginError } = await userSupabase.auth.signInWithPassword({
            email,
            password: 'Karatistas123*',
          });
          
          if (loginData?.user) {
            loginTest = 'SUCCESS';
            // Sign out immediately
            await userSupabase.auth.signOut();
          } else {
            loginTest = `FAILED: ${loginError?.message || 'Unknown error'}`;
          }
        } catch (e) {
          loginTest = `ERROR: ${e.message}`;
        }
        
        results[email] = {
          auth_exists: !!authUser?.user,
          auth_user_id: authUser?.user?.id || null,
          auth_error: authError?.message || null,
          kv_user_id: kvUserId || null,
          kv_profile_exists: !!kvProfile,
          login_test: loginTest,
          user_type: userType
        };
        
      } catch (error) {
        console.error(`Error checking user ${email}:`, error);
        results[email] = {
          error: error.message,
          stack: error.stack
        };
      }
    }

    console.log('=== DEBUG RESULTS ===');
    console.log(JSON.stringify(results, null, 2));

    return c.json({
      status: 'Debug user check completed',
      timestamp: new Date().toISOString(),
      results: results,
      environment: {
        supabase_url: Deno.env.get('SUPABASE_URL'),
        has_service_key: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
        has_anon_key: !!Deno.env.get('SUPABASE_ANON_KEY')
      }
    });
    
  } catch (error) {
    console.error('Debug users endpoint error:', error);
    return c.json({ 
      error: error.message, 
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, 500);
  }
});

// Manual user creation endpoint
app.post('/make-server-8675f3cb/debug/create-users', async (c) => {
  try {
    console.log('=== MANUAL USER CREATION TRIGGERED ===');
    await createSampleUsers();
    
    // Wait a moment then check status
    setTimeout(async () => {
      const adminExists = await kv.get('admin_by_email:lukasjusekvicius18@gmail.com');
      const driverExists = await kv.get('driver_by_email:92plmqaz@gmail.com');
      const clientExists = await kv.get('client_by_email:paul.my25@gmail.com');
      
      console.log('Post-creation check:');
      console.log('Admin exists:', !!adminExists);
      console.log('Driver exists:', !!driverExists);
      console.log('Client exists:', !!clientExists);
    }, 2000);
    
    return c.json({ 
      success: true, 
      message: 'Manual user creation attempted',
      timestamp: new Date().toISOString(),
      note: 'Check server logs for detailed results'
    });
  } catch (error) {
    console.error('Manual user creation error:', error);
    return c.json({ error: error.message, stack: error.stack }, 500);
  }
});

// Environment check endpoint
app.get('/make-server-8675f3cb/debug/env', (c) => {
  return c.json({
    timestamp: new Date().toISOString(),
    environment: {
      supabase_url: Deno.env.get('SUPABASE_URL') ? 'SET' : 'NOT SET',
      supabase_url_value: Deno.env.get('SUPABASE_URL'),
      service_role_key: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'SET' : 'NOT SET',
      anon_key: Deno.env.get('SUPABASE_ANON_KEY') ? 'SET' : 'NOT SET',
      db_url: Deno.env.get('SUPABASE_DB_URL') ? 'SET' : 'NOT SET'
    }
  });
});

// Login endpoint with enhanced error handling
app.post('/make-server-8675f3cb/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    console.log(`=== LOGIN ATTEMPT ===`);
    console.log(`Email: ${email}`);
    console.log(`Request endpoint: /auth/login`);
    console.log(`Request method: POST`);

    if (!email || !password) {
      console.log('LOGIN ERROR: Missing email or password');
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Create client for user authentication (not admin)
    const userSupabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    console.log('Attempting Supabase auth signin...');
    const { data, error } = await userSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('=== LOGIN AUTHENTICATION FAILED ===');
      console.log('Supabase auth error:', error);
      console.log('Error code:', error.code);
      console.log('Error status:', error.status);
      console.log('Error message:', error.message);
      
      // Return proper login error message
      let errorMessage = 'Invalid login credentials';
      
      // Map specific Supabase error codes to user-friendly messages
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please confirm your email before logging in';
      } else if (error.message.includes('User not found')) {
        errorMessage = 'No account found with this email address';
      } else if (error.message.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please try again later';
      }
      
      console.log('Returning error message:', errorMessage);
      return c.json({ error: errorMessage }, 401);
    }

    if (!data.session?.access_token) {
      console.log('LOGIN ERROR: No session created');
      return c.json({ error: 'Login failed - no session created' }, 401);
    }

    console.log('=== LOGIN AUTHENTICATION SUCCESSFUL ===');
    console.log('User ID:', data.user.id);

    // Get user profile to determine user type
    const userId = data.user.id;
    let userType = 'unknown';
    let profile = null;

    // Check if admin
    const adminProfile = await kv.get(`admin:${userId}`);
    if (adminProfile) {
      userType = 'admin';
      profile = JSON.parse(adminProfile);
    } else {
      // Check if driver
      const driverProfile = await kv.get(`driver:${userId}`);
      if (driverProfile) {
        userType = 'driver';
        profile = JSON.parse(driverProfile);
      } else {
        // Check if client
        const clientProfile = await kv.get(`client:${userId}`);
        if (clientProfile) {
          userType = 'client';
          profile = JSON.parse(clientProfile);
        }
      }
    }

    console.log(`=== LOGIN SUCCESSFUL ===`);
    console.log(`User: ${email} (${userType})`);
    console.log(`User ID: ${userId}`);
    
    return c.json({
      success: true,
      message: 'Login successful',
      user: {
        id: userId,
        email: data.user.email,
        type: userType,
        profile: profile
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      }
    });

  } catch (error) {
    console.log('=== LOGIN SERVER ERROR ===');
    console.log('Login server error:', error);
    console.log('Error stack:', error.stack);
    return c.json({ error: `Server error during login: ${error.message}` }, 500);
  }
});

// Logout endpoint
app.post('/make-server-8675f3cb/auth/logout', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (accessToken) {
      const userSupabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
      );
      
      await userSupabase.auth.signOut();
    }

    return c.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.log('Logout error:', error);
    return c.json({ error: `Logout error: ${error.message}` }, 500);
  }
});

// Client Registration with enhanced error handling
app.post('/make-server-8675f3cb/register/client', async (c) => {
  try {
    const body = await c.req.json();
    const { companyName, registrationNumber, contactName, email, phone, address, password } = body;

    console.log(`=== CLIENT REGISTRATION ATTEMPT ===`);
    console.log(`Email: ${email}`);
    console.log(`Request endpoint: /register/client`);
    console.log(`Request method: POST`);

    // Create user account
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: contactName,
        type: 'client',
        company: companyName,
        registration_number: registrationNumber,
        phone,
        address
      },
      email_confirm: true
    });

    if (authError) {
      console.log('=== CLIENT REGISTRATION ERROR ===');
      console.log('Client registration auth error:', authError);
      
      // Return proper registration error message
      let errorMessage = 'Registration failed';
      
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        errorMessage = 'A user with this email address is already registered';
      } else if (authError.message.includes('Password')) {
        errorMessage = 'Password does not meet requirements';
      } else if (authError.message.includes('Email')) {
        errorMessage = 'Invalid email address';
      }
      
      console.log('Returning registration error:', errorMessage);
      return c.json({ error: errorMessage }, 400);
    }

    // Store client profile in KV store
    const clientProfile = {
      user_id: user.user.id,
      type: 'client',
      company_name: companyName,
      registration_number: registrationNumber,
      contact_name: contactName,
      email,
      phone,
      address,
      status: 'pending_verification',
      created_at: new Date().toISOString()
    };

    await kv.set(`client:${user.user.id}`, JSON.stringify(clientProfile));
    await kv.set(`client_by_email:${email}`, user.user.id);

    console.log('=== CLIENT REGISTRATION SUCCESSFUL ===');
    console.log('Client registered successfully:', user.user.id);
    return c.json({ success: true, message: 'Client registration successful. Account pending verification.' });

  } catch (error) {
    console.log('=== CLIENT REGISTRATION SERVER ERROR ===');
    console.log('Client registration error:', error);
    return c.json({ error: `Error during client registration: ${error.message}` }, 500);
  }
});

// Driver Registration with enhanced error handling
app.post('/make-server-8675f3cb/register/driver', async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, email, phone, nationality, password } = body;

    console.log(`=== DRIVER REGISTRATION ATTEMPT ===`);
    console.log(`Email: ${email}`);
    console.log(`Request endpoint: /register/driver`);
    console.log(`Request method: POST`);

    // Create user account
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: fullName,
        type: 'driver',
        nationality,
        phone
      },
      email_confirm: true
    });

    if (authError) {
      console.log('=== DRIVER REGISTRATION ERROR ===');
      console.log('Driver registration auth error:', authError);
      
      // Return proper registration error message
      let errorMessage = 'Registration failed';
      
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        errorMessage = 'A user with this email address is already registered';
      } else if (authError.message.includes('Password')) {
        errorMessage = 'Password does not meet requirements';
      } else if (authError.message.includes('Email')) {
        errorMessage = 'Invalid email address';
      }
      
      console.log('Returning registration error:', errorMessage);
      return c.json({ error: errorMessage }, 400);
    }

    // Store driver profile in KV store
    const driverProfile = {
      user_id: user.user.id,
      type: 'driver',
      full_name: fullName,
      email,
      phone,
      nationality,
      status: 'pending_verification',
      profile_complete: false,
      created_at: new Date().toISOString()
    };

    await kv.set(`driver:${user.user.id}`, JSON.stringify(driverProfile));
    await kv.set(`driver_by_email:${email}`, user.user.id);

    console.log('=== DRIVER REGISTRATION SUCCESSFUL ===');
    console.log('Driver registered successfully:', user.user.id);
    return c.json({ success: true, message: 'Driver registration successful. Account pending verification.' });

  } catch (error) {
    console.log('=== DRIVER REGISTRATION SERVER ERROR ===');
    console.log('Driver registration error:', error);
    return c.json({ error: `Error during driver registration: ${error.message}` }, 500);
  }
});

// Driver Application
app.post('/make-server-8675f3cb/driver/application', async (c) => {
  try {
    const body = await c.req.json();
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const application = {
      id: applicationId,
      ...body,
      status: 'submitted',
      created_at: new Date().toISOString()
    };

    await kv.set(`driver_application:${applicationId}`, JSON.stringify(application));
    await kv.set(`application_by_email:${body.email}`, applicationId);

    console.log('Driver application submitted:', applicationId);
    return c.json({ 
      success: true, 
      message: 'Application submitted successfully. We will review it within 24-48 hours.',
      application_id: applicationId
    });

  } catch (error) {
    console.log('Driver application error:', error);
    return c.json({ error: `Error submitting driver application: ${error.message}` }, 500);
  }
});

// Client Job Request
app.post('/make-server-8675f3cb/client/job-request', async (c) => {
  try {
    const body = await c.req.json();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const jobRequest = {
      id: requestId,
      ...body,
      status: 'open',
      created_at: new Date().toISOString()
    };

    await kv.set(`job_request:${requestId}`, JSON.stringify(jobRequest));
    await kv.set(`request_by_email:${body.email}`, requestId);

    console.log('Job request submitted:', requestId);
    return c.json({ 
      success: true, 
      message: 'Job request submitted successfully. We will contact you within 24 hours.',
      request_id: requestId
    });

  } catch (error) {
    console.log('Job request error:', error);
    return c.json({ error: `Error submitting job request: ${error.message}` }, 500);
  }
});

// Contact Form
app.post('/make-server-8675f3cb/contact', async (c) => {
  try {
    const body = await c.req.json();
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const message = {
      id: messageId,
      ...body,
      status: 'new',
      created_at: new Date().toISOString()
    };

    await kv.set(`contact_message:${messageId}`, JSON.stringify(message));

    console.log('Contact message submitted:', messageId);
    return c.json({ 
      success: true, 
      message: 'Message sent successfully. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.log('Contact form error:', error);
    return c.json({ error: `Error sending contact message: ${error.message}` }, 500);
  }
});

// Get testimonials
app.get('/make-server-8675f3cb/testimonials', async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial:');
    const approvedTestimonials = testimonials
      .map(t => JSON.parse(t))
      .filter(t => t.status === 'approved')
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return c.json({ testimonials: approvedTestimonials });

  } catch (error) {
    console.log('Error fetching testimonials:', error);
    return c.json({ error: `Error fetching testimonials: ${error.message}` }, 500);
  }
});

// Submit testimonial (requires authentication)
app.post('/make-server-8675f3cb/testimonial', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user?.id) {
      return c.json({ error: 'Invalid authorization token' }, 401);
    }

    const body = await c.req.json();
    const testimonialId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const testimonial = {
      id: testimonialId,
      user_id: user.id,
      ...body,
      status: 'pending_review',
      created_at: new Date().toISOString()
    };

    await kv.set(`testimonial:${testimonialId}`, JSON.stringify(testimonial));

    console.log('Testimonial submitted:', testimonialId);
    return c.json({ 
      success: true, 
      message: 'Testimonial submitted for review. It will be published after approval.'
    });

  } catch (error) {
    console.log('Testimonial submission error:', error);
    return c.json({ error: `Error submitting testimonial: ${error.message}` }, 500);
  }
});

// Get vacancies
app.get('/make-server-8675f3cb/vacancies', async (c) => {
  try {
    const vacancies = await kv.getByPrefix('vacancy:');
    const activeVacancies = vacancies
      .map(v => JSON.parse(v))
      .filter(v => v.status === 'active')
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return c.json({ vacancies: activeVacancies });

  } catch (error) {
    console.log('Error fetching vacancies:', error);
    return c.json({ error: `Error fetching vacancies: ${error.message}` }, 500);
  }
});

// Apply to vacancy (requires authentication)
app.post('/make-server-8675f3cb/vacancy/:id/apply', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user?.id) {
      return c.json({ error: 'Invalid authorization token' }, 401);
    }

    const vacancyId = c.req.param('id');
    const body = await c.req.json();
    
    const applicationId = `vac_app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const application = {
      id: applicationId,
      vacancy_id: vacancyId,
      user_id: user.id,
      ...body,
      status: 'submitted',
      created_at: new Date().toISOString()
    };

    await kv.set(`vacancy_application:${applicationId}`, JSON.stringify(application));
    await kv.set(`vacancy_app_by_user:${user.id}:${vacancyId}`, applicationId);

    console.log('Vacancy application submitted:', applicationId);
    return c.json({ 
      success: true, 
      message: 'Application submitted successfully. We will review it and contact you soon.',
      application_id: applicationId
    });

  } catch (error) {
    console.log('Vacancy application error:', error);
    return c.json({ error: `Error submitting vacancy application: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);
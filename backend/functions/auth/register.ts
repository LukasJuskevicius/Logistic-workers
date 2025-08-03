import { Hono } from 'npm:hono@4.0.0';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { clientRegisterSchema, driverRegisterSchema } from '../../database/schemas/auth.ts';
import * as kv from '../../database/kv-store.ts';

const app = new Hono();

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Client registration
app.post('/register/client', async (c) => {
  try {
    const body = await c.req.json();
    const validation = clientRegisterSchema.safeParse(body);
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      }, 400);
    }

    const { email, password, ...clientData } = validation.data;

    console.log(`=== CLIENT REGISTRATION ===`);
    console.log(`Email: ${email}`);

    // Create user in Supabase Auth
    const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        type: 'client',
        ...clientData
      },
      email_confirm: true
    });

    if (authError) {
      console.error('Registration auth error:', authError);
      
      if (authError.code === 'email_exists' || authError.message.includes('already been registered')) {
        return c.json({
          success: false,
          error: 'An account with this email already exists'
        }, 400);
      }
      
      return c.json({
        success: false,
        error: authError.message || 'Registration failed'
      }, 400);
    }

    if (!newUser?.user?.id) {
      return c.json({
        success: false,
        error: 'Registration failed - no user ID returned'
      }, 500);
    }

    // Create client profile
    const clientProfile = {
      id: newUser.user.id,
      email,
      type: 'client',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      company_name: clientData.companyName,
      registration_number: clientData.registrationNumber,
      contact_name: clientData.contactName,
      phone: clientData.phone,
      address: clientData.address,
      business_type: clientData.businessType
    };

    // Store profile in KV store
    await kv.set(`client:${newUser.user.id}`, JSON.stringify(clientProfile));
    await kv.set(`client_by_email:${email}`, newUser.user.id);

    console.log(`Client registration successful: ${email}`);
    
    return c.json({
      success: true,
      message: 'Registration successful! Please check your email for confirmation.',
      data: { user: clientProfile }
    }, 201);

  } catch (error) {
    console.error('Client registration error:', error);
    return c.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
});

// Driver registration
app.post('/register/driver', async (c) => {
  try {
    const body = await c.req.json();
    const validation = driverRegisterSchema.safeParse(body);
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      }, 400);
    }

    const { email, password, ...driverData } = validation.data;

    console.log(`=== DRIVER REGISTRATION ===`);
    console.log(`Email: ${email}`);

    // Create user in Supabase Auth
    const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        type: 'driver',
        ...driverData
      },
      email_confirm: true
    });

    if (authError) {
      console.error('Registration auth error:', authError);
      
      if (authError.code === 'email_exists' || authError.message.includes('already been registered')) {
        return c.json({
          success: false,
          error: 'An account with this email already exists'
        }, 400);
      }
      
      return c.json({
        success: false,
        error: authError.message || 'Registration failed'
      }, 400);
    }

    if (!newUser?.user?.id) {
      return c.json({
        success: false,
        error: 'Registration failed - no user ID returned'
      }, 500);
    }

    // Create driver profile
    const driverProfile = {
      id: newUser.user.id,
      email,
      type: 'driver',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      full_name: driverData.fullName,
      phone: driverData.phone,
      nationality: driverData.nationality,
      license_number: driverData.licenseNumber,
      license_categories: driverData.licenseCategories || [],
      experience_years: driverData.experience ? parseInt(driverData.experience) : undefined,
      languages: driverData.languages || {},
      preferred_routes: driverData.preferredRoutes,
      availability: driverData.availability,
      certifications: driverData.certifications ? driverData.certifications.split(',') : [],
      profile_complete: false
    };

    // Store profile in KV store
    await kv.set(`driver:${newUser.user.id}`, JSON.stringify(driverProfile));
    await kv.set(`driver_by_email:${email}`, newUser.user.id);

    console.log(`Driver registration successful: ${email}`);
    
    return c.json({
      success: true,
      message: 'Registration successful! Please check your email for confirmation.',
      data: { user: driverProfile }
    }, 201);

  } catch (error) {
    console.error('Driver registration error:', error);
    return c.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
});

export default app;
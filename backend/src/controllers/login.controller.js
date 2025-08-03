import { supabase } from '../config/supabase.js';

export class LoginController {
  static async login(email, password) {
    try {
      console.log(`🔐 Login attempt for: ${email}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('❌ Login failed:', error.message);
        return {
          success: false,
          error: error.message
        };
      }

      if (!data.user || !data.session) {
        return {
          success: false,
          error: 'Authentication failed'
        };
      }

      // Get user profile from users table
      let { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
      }

      // Create user profile if it doesn't exist
      if (profileError && profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            type: 'driver',
            first_name: data.user.user_metadata?.first_name || data.user.email?.split('@')[0] || '',
            last_name: data.user.user_metadata?.last_name || ''
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
        } else {
          profile = newProfile;
        }
      }

      console.log(`✅ Login successful: ${email} (${profile?.type || 'driver'})`);

      return {
        success: true,
        data: {
          user: {
            id: data.user.id,
            email: data.user.email || '',
            type: profile?.type || 'driver',
            firstName: profile?.first_name || data.user.user_metadata?.first_name || data.user.email?.split('@')[0] || '',
            lastName: profile?.last_name || data.user.user_metadata?.last_name || '',
            isVerified: data.user.email_confirmed_at ? true : false,
            createdAt: data.user.created_at || new Date().toISOString(),
            updatedAt: data.user.updated_at || new Date().toISOString()
          },
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
          }
        }
      };

    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }
} 
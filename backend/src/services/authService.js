import { supabase } from '../config/supabase.js';

export class AuthService {
  // Login user
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

  // Register user
  static async register(userData, userType) {
    try {
      console.log(`📝 Registration attempt for: ${userData.email} (${userType})`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: {
          type: userType,
          first_name: userData.firstName,
          last_name: userData.lastName
        },
        email_confirm: true
      });

      if (error) {
        console.error('❌ Registration failed:', error);
        return {
          success: false,
          error: error.message
        };
      }

      if (!data.user?.id) {
        return {
          success: false,
          error: 'Registration failed - no user ID returned'
        };
      }

      // Create user profile
      const profileData = {
        id: data.user.id,
        email: userData.email,
        type: userType,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        company_name: userData.companyName,
        license_number: userData.licenseNumber,
        experience_years: userData.experienceYears,
        address: userData.address,
        nationality: userData.nationality,
        license_categories: userData.licenseCategories || [],
        languages: userData.languages || {},
        preferred_routes: userData.preferredRoutes,
        availability: userData.availability,
        certifications: userData.certifications
      };

      const { error: profileError } = await supabase
        .from('users')
        .insert(profileData);

      if (profileError) {
        console.error('❌ Error creating user profile:', profileError);
        return {
          success: false,
          error: 'Failed to create user profile'
        };
      }

      console.log(`✅ Registration successful: ${userData.email} (${userType})`);

      return {
        success: true,
        message: 'Registration successful! Please check your email for confirmation.',
        data: { user: profileData }
      };

    } catch (error) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Logout user
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Logout error:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log('✅ Logout successful');
      return {
        success: true,
        message: 'Logged out successfully'
      };

    } catch (error) {
      console.error('❌ Logout error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Get user error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Update user profile
  static async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Update profile error:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log(`✅ Profile updated for user: ${userId}`);
      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Update profile error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }
} 
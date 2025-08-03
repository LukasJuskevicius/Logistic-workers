import { supabase } from '../config/supabase.js';
import { UserDAO } from '../daos/user.dao.js';

export class RegisterController {
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

      // Create user profile using DAO
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

      const profileResult = await UserDAO.createProfile(profileData);

      if (!profileResult.success) {
        console.error('❌ Error creating user profile:', profileResult.error);
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
} 
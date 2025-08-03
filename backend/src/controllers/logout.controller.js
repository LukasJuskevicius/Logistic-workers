import { supabase } from '../config/supabase.js';

export class LogoutController {
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
} 
import { supabase } from '../config/supabase.js';

export class UserDAO {
  // Create user profile
  static async createProfile(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

      if (error) {
        console.error('❌ User DAO create error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ User DAO create error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user by ID
  static async getById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ User DAO getById error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user by email
  static async getByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ User DAO getByEmail error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  static async updateProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ User DAO update error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ User DAO update error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all users (admin only)
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ User DAO getAll error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ User DAO getAll error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete user
  static async delete(userId) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('❌ User DAO delete error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('❌ User DAO delete error:', error);
      return { success: false, error: error.message };
    }
  }
} 
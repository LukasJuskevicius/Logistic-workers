import { supabase } from '../config/supabase.js';

export class VacancyDAO {
  // Get all vacancies
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Vacancy DAO getAll error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Vacancy DAO getAll error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get vacancy by ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Vacancy DAO getById error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create vacancy
  static async create(vacancyData) {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .insert(vacancyData)
        .select()
        .single();

      if (error) {
        console.error('❌ Vacancy DAO create error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Vacancy DAO create error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update vacancy
  static async update(id, vacancyData) {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .update(vacancyData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Vacancy DAO update error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Vacancy DAO update error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete vacancy
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('vacancies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Vacancy DAO delete error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('❌ Vacancy DAO delete error:', error);
      return { success: false, error: error.message };
    }
  }
} 
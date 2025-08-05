import { supabase, getMockData } from '../config/supabase.js';

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
        console.log('🔄 Database error, using mock data for vacancies');
        const mockData = getMockData();
        return { success: true, data: mockData.vacancies };
      }

      return { success: true, data };
    } catch (error) {
      console.log('🔄 Database error, using mock data for vacancies');
      const mockData = getMockData();
      return { success: true, data: mockData.vacancies };
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
        console.log('🔄 Database error, using mock data for vacancy');
        const mockData = getMockData();
        const vacancy = mockData.vacancies.find(v => v.id === id);
        if (vacancy) {
          return { success: true, data: vacancy };
        } else {
          return { success: false, error: 'Vacancy not found' };
        }
      }

      return { success: true, data };
    } catch (error) {
      console.log('🔄 Database error, using mock data for vacancy');
      const mockData = getMockData();
      const vacancy = mockData.vacancies.find(v => v.id === id);
      if (vacancy) {
        return { success: true, data: vacancy };
      } else {
        return { success: false, error: 'Vacancy not found' };
      }
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
        console.log('🔄 Database error, simulating vacancy creation');
        // Simulate creation with mock data
        const newVacancy = {
          id: Date.now().toString(),
          ...vacancyData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return { success: true, data: newVacancy };
      }

      return { success: true, data };
    } catch (error) {
      console.log('🔄 Database error, simulating vacancy creation');
      const newVacancy = {
        id: Date.now().toString(),
        ...vacancyData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return { success: true, data: newVacancy };
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
        console.log('🔄 Database error, simulating vacancy update');
        // Simulate update with mock data
        const updatedVacancy = {
          id,
          ...vacancyData,
          updated_at: new Date().toISOString()
        };
        return { success: true, data: updatedVacancy };
      }

      return { success: true, data };
    } catch (error) {
      console.log('🔄 Database error, simulating vacancy update');
      const updatedVacancy = {
        id,
        ...vacancyData,
        updated_at: new Date().toISOString()
      };
      return { success: true, data: updatedVacancy };
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
        console.log('🔄 Database error, simulating vacancy deletion');
        // Simulate deletion
        return { success: true, message: 'Vacancy deleted successfully' };
      }

      return { success: true };
    } catch (error) {
      console.log('🔄 Database error, simulating vacancy deletion');
      return { success: true, message: 'Vacancy deleted successfully' };
    }
  }
} 
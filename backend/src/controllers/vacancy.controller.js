import { VacancyDAO } from '../daos/vacancy.dao.js';

export class VacancyController {
  // Get all vacancies
  static async getAllVacancies() {
    try {
      const result = await VacancyDAO.getAll();
      return result;
    } catch (error) {
      console.error('❌ Get all vacancies error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Get vacancy by ID
  static async getVacancyById(id) {
    try {
      const result = await VacancyDAO.getById(id);
      return result;
    } catch (error) {
      console.error('❌ Get vacancy by ID error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Create vacancy
  static async createVacancy(vacancyData) {
    try {
      const result = await VacancyDAO.create(vacancyData);
      return result;
    } catch (error) {
      console.error('❌ Create vacancy error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Update vacancy
  static async updateVacancy(id, vacancyData) {
    try {
      const result = await VacancyDAO.update(id, vacancyData);
      return result;
    } catch (error) {
      console.error('❌ Update vacancy error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }

  // Delete vacancy
  static async deleteVacancy(id) {
    try {
      const result = await VacancyDAO.delete(id);
      return result;
    } catch (error) {
      console.error('❌ Delete vacancy error:', error);
      return {
        success: false,
        error: error.message || 'Internal server error'
      };
    }
  }
} 
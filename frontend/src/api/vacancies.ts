// Simple API calls for vacancies
const BASE_URL = 'http://localhost:3001/api';

export const vacancies = {
  getAll: async () => {
    try {
      const response = await fetch(`${BASE_URL}/vacancies`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get vacancies error:', error);
      return { success: false, error: 'Network error' };
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/vacancies/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get vacancy error:', error);
      return { success: false, error: 'Network error' };
    }
  }
};
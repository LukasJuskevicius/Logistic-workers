// Simple API calls for vacancies
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export const vacancies = {
  getAll: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/vacancies`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get vacancies error:', error);
      return { success: false, error: 'Network error' };
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/vacancies/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get vacancy error:', error);
      return { success: false, error: 'Network error' };
    }
  }
};
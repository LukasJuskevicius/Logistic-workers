// Simple API calls for contact
const BASE_URL = 'http://localhost:3001/api';

export const contact = {
  submit: async (contactData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Contact submit error:', error);
      return { success: false, error: 'Network error' };
    }
  }
};
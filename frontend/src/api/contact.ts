// Simple API calls for contact
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export const contact = {
  submit: async (contactData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
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
// Logout API module
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function logout() {
  
  try {
    
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    return { success: false, error: 'Network error check 123' };
  }
}

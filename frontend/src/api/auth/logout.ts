// Logout API module
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function logout() {
  console.log('[LOGOUT] Starting logout process');
  
  try {
    console.log('[LOGOUT] Sending request to:', `${BASE_URL}/auth/logout`);
    
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    console.log('[LOGOUT] Response status:', response.status);
    const data = await response.json();
    console.log('[LOGOUT] Logout successful:', data);
    
    return data;
  } catch (error) {
    console.error('[LOGOUT] Error occurred:', error);
    return { success: false, error: 'Network error' };
  }
}

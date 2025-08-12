// Check authentication status API module
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function checkAuth() {
  console.log('[AUTH CHECK] Checking authentication status');
  
  try {
    console.log('[AUTH CHECK] Sending request to:', `${BASE_URL}/auth/check`);
    
    const response = await fetch(`${BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include'
    });
    
    console.log('[AUTH CHECK] Response status:', response.status);
    const data = await response.json();
    console.log('[AUTH CHECK] Auth status:', data);
    
    return data;
  } catch (error) {
    console.error('[AUTH CHECK] Error occurred:', error);
    return { authenticated: false, error: 'Network error' };
  }
}

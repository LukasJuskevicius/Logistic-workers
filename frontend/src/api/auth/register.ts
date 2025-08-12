// Register API module
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function register(userData: any) {
  console.log('[REGISTER] Starting registration process');
  
  try {
    console.log('[REGISTER] Sending request to:', `${BASE_URL}/register`);
    
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData)
    });
    
    console.log('[REGISTER] Response status:', response.status);
    const data = await response.json();
    console.log('[REGISTER] Response data:', data);
    
    return data;
  } catch (error) {
    console.error('[REGISTER] Error occurred:', error);
    return { success: false, error: 'Network error' };
  }
}

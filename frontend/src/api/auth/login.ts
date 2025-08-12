// Login API module
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function login(email: string, password: string) {
  console.log('[LOGIN] Starting login process for:', email);
  
  try {
    console.log('[LOGIN] Sending request to:', `${BASE_URL}/auth/login`);
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    console.log('[LOGIN] Response status:', response.status);
    const data = await response.json();
    console.log('[LOGIN] Response data:', data);
    
    return data;
  } catch (error) {
    console.error('[LOGIN] Error occurred:', error);
    return { success: false, error: 'Network error' };
  }
}

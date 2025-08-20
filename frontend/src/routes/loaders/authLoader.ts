const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function authLoader() {
  try {
    // 1. Browser make request to /api/auth
    const response = await fetch(`${BASE_URL}/auth`, {

      // 2. Tells browser to include cookies with this request
      credentials: 'include',
    });
    
    // 3. Parse json response.
    const result = await response.json();

    // 4. Return user data or null
    return { user: result.user || null };
  } catch {
    return { user: null };
  }
}

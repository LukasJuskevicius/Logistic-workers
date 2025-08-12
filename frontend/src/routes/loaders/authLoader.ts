const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function authLoader() {
  
  try {
    const response = await fetch(`${BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include'
    });
    
    const result = await response.json();
    if (result.authenticated && result.user) {
      return { user: result.user };
    }
    return {user: null};

  } catch (error) {
    return { user: null };
  }
}

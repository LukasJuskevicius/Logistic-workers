const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set!');
}

export async function authLoader() {
  try {
    const response = await fetch(`${BASE_URL}/auth/check`, {
      credentials: 'include'
    });
    const result = await response.json();
    return { user: result.user || null };
  } catch {
    return { user: null };
  }
}

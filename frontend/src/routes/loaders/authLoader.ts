// Auth loader to check authentication status
import { checkAuth } from '../../api/auth/checkAuth';

export async function authLoader() {
  console.log('[LOADER] Checking authentication status...');
  
  const result = await checkAuth();
  
  console.log('[LOADER] Auth check result:', result);
  
  // Return user data if authenticated
  if (result.authenticated && result.user) {
    console.log('[LOADER] User is authenticated:', result.user);
    return { user: result.user };
  }
  
  console.log('[LOADER] User is not authenticated');
  return { user: null };
}

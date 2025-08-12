// src/routes/actions/loginAction.ts
import { login } from '../../api/auth/login';

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  
  try {
    const result = await login(credentials.email as string, credentials.password as string);
    if (result.success) {
      // Store user data in session storage or context
      sessionStorage.setItem('user', JSON.stringify(result.user));
      return { success: true, user: result.user };
    }
    return { error: result.error || 'Login failed' };
  } catch (error) {
    return { error: 'Network error. Please try again.' };
  }
}
// Login action for React Router
import { redirect } from 'react-router-dom';
import { login } from '../../api/auth/login';

export async function loginAction({ request }: { request: Request }) {
  console.log('[ACTION] Login action triggered');
  
  // Get form data
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  console.log('[ACTION] Attempting login for:', email);
  
  // Validate inputs
  if (!email || !password) {
    console.log('[ACTION] Validation failed: Missing email or password');
    return { 
      error: 'Email and password are required',
      fieldErrors: {
        email: !email ? 'Email is required' : null,
        password: !password ? 'Password is required' : null
      }
    };
  }
  
  // Attempt login
  const result = await login(email, password);
  
  console.log('[ACTION] Login result:', result);
  
  if (result.success) {
    console.log('[ACTION] Login successful, staying on current page');
    // Store user data in a way that can be accessed by the app
    // We'll return success and let the component handle the update
    return { 
      success: true, 
      user: result.user,
      message: 'Login successful! You are now logged in.'
    };
  }
  
  console.log('[ACTION] Login failed:', result.error);
  return { 
    error: result.error || 'Login failed. Please check your credentials.',
    fieldErrors: null
  };
}

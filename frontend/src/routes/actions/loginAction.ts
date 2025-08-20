import { redirect } from 'react-router-dom';

export async function loginAction({ request }: { request: Request }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Redirect to home page on success
      return redirect('/');
    }
    
    return result; // Return error if login failed
    
  } catch (error) {
    console.error('Login error:', error);
    return { 
      error: 'Login failed',
      status: 500
    };
  }
}
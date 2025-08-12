// Register action for React Router
import { register } from '../../api/auth/register';

export async function registerAction({ request }: { request: Request }) {
  console.log('[ACTION] Register action triggered');
  
  // Get form data
  const formData = await request.formData();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const type = formData.get('type') as string;
  
  console.log('[ACTION] Attempting registration for:', email);
  console.log('[ACTION] User type:', type);
  
  // Validate inputs
  const fieldErrors: any = {};
  
  if (!firstName) fieldErrors.firstName = 'First name is required';
  if (!lastName) fieldErrors.lastName = 'Last name is required';
  if (!email) fieldErrors.email = 'Email is required';
  if (!password) fieldErrors.password = 'Password is required';
  
  if (Object.keys(fieldErrors).length > 0) {
    console.log('[ACTION] Validation failed:', fieldErrors);
    return { 
      error: 'Please fill in all required fields',
      fieldErrors
    };
  }
  
  // Prepare user data
  const userData = {
    firstName,
    lastName,
    email,
    password,
    type: type || 'driver'
  };
  
  console.log('[ACTION] Sending registration data:', { ...userData, password: '***' });
  
  // Attempt registration
  const result = await register(userData);
  
  console.log('[ACTION] Registration result:', result);
  
  if (result.success) {
    console.log('[ACTION] Registration successful');
    return { 
      success: true,
      message: 'Registration successful! You can now login.'
    };
  }
  
  console.log('[ACTION] Registration failed:', result.error);
  return { 
    error: result.error || 'Registration failed. Please try again.',
    fieldErrors: null
  };
}

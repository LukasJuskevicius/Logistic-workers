// routes/actions/registerAction.ts
import { register } from '../../api/auth/register';
import { redirect } from 'react-router-dom';

export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  
  try {
    const result = await register(userData);
    if (result.success) {
      return redirect('/login?registered=true');
    }
    return { error: result.error || 'Registration failed' };
  } catch {
    return { error: 'Network error' };
  }
}
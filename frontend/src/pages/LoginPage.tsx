// Login page using React Router loader/action pattern
import { LoginForm } from '../components/forms/LoginForm';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';

// No interface needed - props removed when using loaders/actions
export function LoginPage() {
  console.log('[LOGIN PAGE] Rendering login page');
  
  return (
    <BackgroundPattern
      pattern="waves"
      opacity={0.05}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </BackgroundPattern>
  );
}
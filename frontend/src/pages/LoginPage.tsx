
import { LoginForm } from '../components/features/authentication/LoginForm';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </button>
          </p>
        </div>
        
        <LoginForm 
          onLoginSuccess={onLoginSuccess}
          onNavigate={onNavigate}
        />
        
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
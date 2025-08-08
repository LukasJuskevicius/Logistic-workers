// Modern login page wrapper
import { LoginForm } from '../components/forms/LoginForm';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  return (
    <BackgroundPattern
      pattern="waves"
      opacity={0.05}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md">
        <LoginForm onNavigate={onNavigate} onLoginSuccess={onLoginSuccess} />
      </div>
    </BackgroundPattern>
  );
}
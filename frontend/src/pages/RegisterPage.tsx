// Modern register page wrapper
import { RegisterForm } from '../components/forms/RegisterForm';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  return (
    <BackgroundPattern
      pattern="waves"
      opacity={0.05}
      className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md">
        <RegisterForm onNavigate={onNavigate} />
      </div>
    </BackgroundPattern>
  );
}
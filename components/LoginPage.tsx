import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '../utils/api';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log('=== LOGIN FORM SUBMISSION ===');
    console.log('Email:', formData.email);
    console.log('Form action: LOGIN (not registration)');

    try {
      console.log('Calling api.signIn...');
      const data = await api.signIn(formData.email, formData.password);

      console.log('=== LOGIN SUCCESSFUL ===');
      console.log('Response data:', data);

      setSuccess(data.message || 'Login successful!');
      
      // Store user session in localStorage
      localStorage.setItem('logistic_workers_session', JSON.stringify({
        user: data.user,
        session: data.session
      }));

      // Call the success callback
      onLoginSuccess(data.user);

      // Redirect based on user type
      setTimeout(() => {
        if (data.user.type === 'admin') {
          onNavigate('admin');
        } else if (data.user.type === 'driver') {
          onNavigate('drivers');
        } else if (data.user.type === 'client') {
          onNavigate('clients');
        } else {
          onNavigate('home');
        }
      }, 1000);

    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Set user-friendly error message
      let displayError = error.message || 'An error occurred during login';
      
      // Ensure we don't show registration-related errors during login
      if (displayError.includes('already registered')) {
        displayError = 'Invalid email or password';
      }
      
      // Provide helpful guidance for authentication errors
      if (displayError.includes('Invalid email or password')) {
        displayError = 'Invalid email or password. Use the debug tools below to check if demo users exist and recreate them if needed.';
      }
      
      setError(displayError);
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: 'Login to Your Account',
      subtitle: 'Access your Logistic Workers portal',
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      backToHome: 'Back to Home',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      demoAccounts: 'Demo Accounts',
      adminDemo: 'Admin: lukasjusekvicius18@gmail.com',
      driverDemo: 'Driver: 92plmqaz@gmail.com',
      clientDemo: 'Client: paul.my25@gmail.com',
      passwordDemo: 'Password for all: Karatistas123*'
    },
    lt: {
      title: 'Prisijunkite prie savo paskyros',
      subtitle: 'Pasiekite savo Logistic Workers portalą',
      email: 'El. pašto adresas',
      password: 'Slaptažodis',
      login: 'Prisijungti',
      backToHome: 'Grįžti į pradžią',
      showPassword: 'Rodyti slaptažodį',
      hidePassword: 'Slėpti slaptažodį',
      emailRequired: 'El. paštas yra privalomas',
      passwordRequired: 'Slaptažodis yra privalomas',
      demoAccounts: 'Demo paskyros',
      adminDemo: 'Administratorius: lukasjusekvicius18@gmail.com',
      driverDemo: 'Vairuotojas: 92plmqaz@gmail.com',
      clientDemo: 'Klientas: paul.my25@gmail.com',
      passwordDemo: 'Slaptažodis visiems: Karatistas123*'
    },
    nl: {
      title: 'Inloggen op uw account',
      subtitle: 'Toegang tot uw Logistic Workers portaal',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      login: 'Inloggen',
      backToHome: 'Terug naar home',
      showPassword: 'Wachtwoord tonen',
      hidePassword: 'Wachtwoord verbergen',
      emailRequired: 'E-mail is verplicht',
      passwordRequired: 'Wachtwoord is verplicht',
      demoAccounts: 'Demo Accounts',
      adminDemo: 'Admin: lukasjusekvicius18@gmail.com',
      driverDemo: 'Chauffeur: 92plmqaz@gmail.com',
      clientDemo: 'Klant: paul.my25@gmail.com',
      passwordDemo: 'Wachtwoord voor alle: Karatistas123*'
    },
    uk: {
      title: 'Увійти до свого облікового запису',
      subtitle: 'Доступ до вашого порталу Logistic Workers',
      email: 'Адреса електронної пошти',
      password: 'Пароль',
      login: 'Увійти',
      backToHome: 'Повернутися на головну',
      showPassword: 'Показати пароль',
      hidePassword: 'Приховати пароль',
      emailRequired: 'Електронна пошта обов\'язкова',
      passwordRequired: 'Пароль обов\'язковий',
      demoAccounts: 'Демо-акаунти',
      adminDemo: 'Адміністратор: lukasjusekvicius18@gmail.com',
      driverDemo: 'Водій: 92plmqaz@gmail.com',
      clientDemo: 'Клієнт: paul.my25@gmail.com',
      passwordDemo: 'Пароль для всіх: Karatistas123*'
    }
  };

  const text = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {text.backToHome}
          </button>
          <h2 className="text-3xl font-bold text-gray-900">{text.title}</h2>
          <p className="mt-2 text-gray-600">{text.subtitle}</p>
        </div>

        {/* Demo accounts info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-900">{text.demoAccounts}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-1">
            <p>{text.adminDemo}</p>
            <p>{text.driverDemo}</p>
            <p>{text.clientDemo}</p>
            <p className="font-medium pt-2">{text.passwordDemo}</p>
            <div className="mt-4 pt-3 border-t border-blue-300 space-y-2">
              <button
                onClick={async () => {
                  try {
                    const { projectId } = await import('../utils/supabase/info');
                    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb/debug/users`);
                    const data = await response.json();
                    
                    console.log('=== DEBUG USERS RESPONSE ===');
                    console.log(data);
                    
                    let message = 'User Status Check:\n\n';
                    Object.entries(data.results).forEach(([email, info]) => {
                      message += `${email}:\n`;
                      message += `  Auth: ${info.auth_exists ? 'EXISTS' : 'MISSING'}\n`;
                      message += `  Profile: ${info.kv_profile_exists ? 'EXISTS' : 'MISSING'}\n`;
                      message += `  Login Test: ${info.login_test}\n\n`;
                    });
                    
                    alert(message);
                  } catch (e) {
                    console.error('Debug check error:', e);
                    alert('Debug check failed: ' + e.message);
                  }
                }}
                className="block text-xs text-blue-600 hover:text-blue-800 underline"
              >
                🔍 Full User Status Check
              </button>
              
              <button
                onClick={async () => {
                  try {
                    const { projectId } = await import('../utils/supabase/info');
                    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb/debug/create-users`, {
                      method: 'POST'
                    });
                    const data = await response.json();
                    console.log('Manual user creation response:', data);
                    alert('User creation triggered! Check console for details. Wait a few seconds then use the status check button.');
                  } catch (e) {
                    console.error('Manual user creation error:', e);
                    alert('Manual user creation failed: ' + e.message);
                  }
                }}
                className="block text-xs text-green-600 hover:text-green-800 underline"
              >
                🛠️ Manually Create Demo Users
              </button>
              
              <button
                onClick={async () => {
                  try {
                    const { projectId } = await import('../utils/supabase/info');
                    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb/debug/env`);
                    const data = await response.json();
                    console.log('Environment check:', data);
                    
                    let message = 'Environment Check:\n\n';
                    Object.entries(data.environment).forEach(([key, value]) => {
                      message += `${key}: ${value}\n`;
                    });
                    
                    alert(message);
                  } catch (e) {
                    console.error('Environment check error:', e);
                    alert('Environment check failed: ' + e.message);
                  }
                }}
                className="block text-xs text-purple-600 hover:text-purple-800 underline"
              >
                ⚙️ Check Environment
              </button>
              
              <button
                onClick={async () => {
                  if (!confirm('This will delete and recreate all demo users. Are you sure?')) return;
                  
                  try {
                    const { projectId } = await import('../utils/supabase/info');
                    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb/debug/force-recreate-users`, {
                      method: 'POST'
                    });
                    const data = await response.json();
                    console.log('Force recreate response:', data);
                    
                    if (data.success) {
                      alert('Users force recreated successfully! Wait 10 seconds then try logging in again.');
                    } else {
                      alert('Force recreate failed: ' + (data.error || 'Unknown error'));
                    }
                  } catch (e) {
                    console.error('Force recreate error:', e);
                    alert('Force recreate failed: ' + e.message);
                  }
                }}
                className="block text-xs text-red-600 hover:text-red-800 underline"
              >
                🔥 Force Recreate Users
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      placeholder={text.email}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      placeholder={text.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      title={showPassword ? text.hidePassword : text.showPassword}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {text.login}...
                  </div>
                ) : (
                  text.login
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
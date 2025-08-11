// Modern login form component
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../../api/auth';

interface LoginFormProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginForm({ onNavigate, onLoginSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await auth.login(email, password);
    
    if (result.success) {
      onLoginSuccess(result.user);
      onNavigate('home');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs md:text-sm mb-4">
          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
          <span className="font-medium">{t('login.title')}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('login.title')}</h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">{t('login.subtitle')}</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('login.form.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('login.form.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            {t('login.form.rememberMe')}
          </label>
          <button type="button" className="text-indigo-600 hover:text-indigo-800" onClick={() => onNavigate('forgot-password')}>
            {t('login.form.forgotPassword')}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300"
        >
          {loading ? t('common.loading') : t('login.form.login')}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-xs text-gray-500">or continue with</span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
          <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-.9 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-5.3c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V24h-4z"/></svg>
          LinkedIn
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
          <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.112.82-.262.82-.582 0-.29-.012-1.243-.018-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.297-1.23 3.297-1.23.654 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.81 1.102.81 2.222 0 1.604-.014 2.896-.014 3.29 0 .322.216.698.825.58C20.565 21.797 24 17.298 24 12 24 5.37 18.63 0 12 0z"/></svg>
          GitHub
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
          <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.69-.5-7.7-2.52-2.02-2.02-3-4.88-2.52-7.7.12-.69.99-.93 1.47-.45l2.12 2.12c.39.39.39 1.02 0 1.41L5.41 14c1.17 1.17 2.72 1.76 4.29 1.59l.02-.02c.39-.05.74.22.79.61.02.15.03.3.03.45v2.3c0 .49-.35.91-.83.99z"/></svg>
          Email
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {t('login.form.dontHaveAccount')}{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {t('login.form.register')}
          </button>
        </p>
      </div>
    </div>
  );
}
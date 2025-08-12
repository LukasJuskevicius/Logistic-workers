// Register form using React Router Form component
import { useEffect } from 'react';
import { Form, useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// No interface needed - props removed when using React Router Form
export function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData() as any;
  
  // Check if we're submitting
  const isSubmitting = navigation.state === 'submitting';
  
  console.log('[REGISTER FORM] Component rendered');
  console.log('[REGISTER FORM] Navigation state:', navigation.state);
  console.log('[REGISTER FORM] Action data:', actionData);
  
  // Handle successful registration
  useEffect(() => {
    if (actionData?.success) {
      console.log('[REGISTER FORM] Registration successful, redirecting to login');
      // After successful registration, redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [actionData, navigate]);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs md:text-sm mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
          <span className="font-medium">{t('register.title')}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('register.title')}</h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">{t('register.subtitle')}</p>
      </div>

      {/* Show success message */}
      {actionData?.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4">
          {actionData.message || 'Registration successful! Redirecting to login...'}
        </div>
      )}

      {/* Show error message */}
      {actionData?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {actionData.error}
        </div>
      )}

      {/* Show loading state */}
      {isSubmitting && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl mb-4">
          Creating your account... Please wait...
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('register.form.firstName')}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50"
              required
              disabled={isSubmitting}
            />
            {actionData?.fieldErrors?.firstName && (
              <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('register.form.lastName')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50"
              required
              disabled={isSubmitting}
            />
            {actionData?.fieldErrors?.lastName && (
              <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('register.form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50"
            required
            disabled={isSubmitting}
          />
          {actionData?.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('register.form.password')}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50"
            required
            disabled={isSubmitting}
          />
          {actionData?.fieldErrors?.password && (
            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            {t('register.form.userType')}
          </label>
          <select
            id="type"
            name="type"
            defaultValue="driver"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50"
            disabled={isSubmitting}
          >
            <option value="driver">{t('register.form.driver')}</option>
            <option value="client">{t('register.form.employer')}</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || actionData?.success}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition-all duration-300"
        >
          {isSubmitting ? 'Creating account...' : actionData?.success ? 'Account created!' : t('register.form.register')}
        </button>
      </Form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-xs text-gray-500">or sign up with</span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button 
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300"
          disabled={isSubmitting}
        >
          <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-.9 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-5.3c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V24h-4z"/></svg>
          LinkedIn
        </button>
        <button 
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300"
          disabled={isSubmitting}
        >
          <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.112.82-.262.82-.582 0-.29-.012-1.243-.018-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.297-1.23 3.297-1.23.654 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.81 1.102.81 2.222 0 1.604-.014 2.896-.014 3.29 0 .322.216.698.825.58C20.565 21.797 24 17.298 24 12 24 5.37 18.63 0 12 0z"/></svg>
          GitHub
        </button>
        <button 
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300"
          disabled={isSubmitting}
        >
          <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.69-.5-7.7-2.52-2.02-2.02-3-4.88-2.52-7.7.12-.69.99-.93 1.47-.45l2.12 2.12c.39.39.39 1.02 0 1.41L5.41 14c1.17 1.17 2.72 1.76 4.29 1.59l.02-.02c.39-.05.74.22.79.61.02.15.03.3.03.45v2.3c0 .49-.35.91-.83.99z"/></svg>
          Email
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {t('register.form.alreadyHaveAccount')}{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-600 hover:text-emerald-800"
            disabled={isSubmitting}
          >
            {t('register.form.signIn')}
          </button>
        </p>
      </div>
    </div>
  );
}
import { useOutletContext, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface OutletContext {
  user: any;
}

export function DashboardPage() {
  const { user } = useOutletContext<OutletContext>();
  const { t } = useTranslation();

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Role-based dashboard rendering
  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'client':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t('profile.dashboard')} - {t('navigation.forClients')}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">{t('profile.myJobPosts')}</h3>
                  <p className="text-blue-700 text-sm mt-1">Manage your job postings</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">{t('profile.findDrivers')}</h3>
                  <p className="text-green-700 text-sm mt-1">Search for qualified drivers</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900">{t('profile.messages')}</h3>
                  <p className="text-purple-700 text-sm mt-1">Communicate with drivers</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'driver':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t('profile.dashboard')} - {t('navigation.forDrivers')}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">{t('vacancies.title')}</h3>
                  <p className="text-blue-700 text-sm mt-1">Browse available positions</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">{t('profile.myAdvertisements')}</h3>
                  <p className="text-green-700 text-sm mt-1">Manage your applications</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900">{t('profile.messages')}</h3>
                  <p className="text-purple-700 text-sm mt-1">Communicate with employers</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t('profile.dashboard')}
              </h1>
              <p className="text-gray-600">Welcome to your dashboard!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
}

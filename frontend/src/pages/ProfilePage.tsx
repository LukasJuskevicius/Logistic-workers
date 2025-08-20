import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DriverProfile from '../components/profile/DriverProfile';

// Temporary inline components until TypeScript recognizes the separate files
const AdminProfile = ({ user }: { user: any }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.first_name?.[0]}{user.last_name?.[0]}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mt-2">
              Administrator
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Link to="/admin/users" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.manageUsers')}</h3>
              <p className="text-sm text-gray-600">Manage system users</p>
            </div>
          </div>
        </Link>
        
        <Link to="/admin/analytics" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.analytics')}</h3>
              <p className="text-sm text-gray-600">View system analytics</p>
            </div>
          </div>
        </Link>
        
        <Link to="/messages" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✉️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.messages')}</h3>
              <p className="text-sm text-gray-600">System messages</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const ClientProfile = ({ user }: { user: any }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.first_name?.[0]}{user.last_name?.[0]}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.company_name || `${user.first_name} ${user.last_name}`}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
              Client
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/my-job-posts" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.myJobPosts')}</h3>
              <p className="text-sm text-gray-600">Manage your job postings</p>
            </div>
          </div>
        </Link>
        
        <Link to="/find-drivers" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.findDrivers')}</h3>
              <p className="text-sm text-gray-600">Search for qualified drivers</p>
            </div>
          </div>
        </Link>
        
        <Link to="/messages" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✉️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.messages')}</h3>
              <p className="text-sm text-gray-600">Communicate with drivers</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};



interface OutletContext {
  user: any;
}

export function ProfilePage() {
  const { user } = useOutletContext<OutletContext>();
  const { t } = useTranslation();

  // Redirect to login if not authenticated
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  // Handle user profile updates
  const handleUserUpdate = (updatedUser: any) => {
    // In a real app, you'd update the user context or refetch user data
    console.log('User updated:', updatedUser);
    // For now, we'll just log the update
    // TODO: Implement proper user context update
  };

  // Role-based profile rendering
  const renderProfile = () => {
    switch (user.role) {
      case 'admin':
        return <AdminProfile user={user} />;
      case 'client':
        return <ClientProfile user={user} />;
      case 'driver':
        return <DriverProfile user={user} onUpdate={handleUserUpdate} />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t('profile.myProfile')}
              </h1>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{user.first_name} {user.last_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderProfile()}
    </div>
  );
}

import { useTranslation } from 'react-i18next';

export function AdminOverview() {
  const { t } = useTranslation();

  const stats = [
    { label: t('admin.totalUsers'), value: '234', change: '+12%', icon: '👥' },
    { label: t('admin.activeDrivers'), value: '89', change: '+5%', icon: '🚚' },
    { label: t('admin.activeClients'), value: '145', change: '+18%', icon: '🏢' },
    { label: t('admin.messagestoday'), value: '42', change: '-3%', icon: '✉️' }
  ];

  const recentActivity = [
    { user: 'John Smith', action: 'Registered as driver', time: '2 hours ago' },
    { user: 'Emma Davis', action: 'Updated profile', time: '3 hours ago' },
    { user: 'Mike Johnson', action: 'Sent message to admin', time: '5 hours ago' },
    { user: 'Sarah Wilson', action: 'Uploaded documents', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('admin.overview')}</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.recentActivity')}</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

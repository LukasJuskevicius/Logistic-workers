import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function AdminUsers() {
  const { t } = useTranslation();
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    { id: 1, name: 'John Smith', email: 'john@logistics.com', role: 'driver', status: 'verified', joined: '2024-01-10' },
    { id: 2, name: 'Emma Davis', email: 'emma@company.com', role: 'client', status: 'verified', joined: '2024-01-08' },
    { id: 3, name: 'Mike Johnson', email: 'mike@transport.com', role: 'client', status: 'pending', joined: '2024-01-12' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@logistics.com', role: 'driver', status: 'verified', joined: '2024-01-05' }
  ];

  const filteredUsers = filterRole === 'all' ? users : users.filter(u => u.role === filterRole);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.userManagement')}</h2>
        <div className="flex space-x-2">
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">{t('admin.allRoles')}</option>
            <option value="driver">{t('admin.drivers')}</option>
            <option value="client">{t('admin.clients')}</option>
            <option value="admin">{t('admin.admins')}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('admin.name')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('admin.email')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('admin.role')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('admin.status')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('admin.joined')}</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'driver' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'verified' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.joined}</td>
                <td className="py-3 px-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mr-3">
                    {t('admin.edit')}
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    {t('admin.ban')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

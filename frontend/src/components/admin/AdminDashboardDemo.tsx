import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthCheck } from '../../utils/authCheck';
import { adminApi, AdminStats, AdminUser } from '../../api/admin';

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-xl mb-3">
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );
}

const ROLE_CLASS: Record<string, string> = {
  driver: 'bg-blue-100 text-blue-700',
  client: 'bg-green-100 text-green-700',
  admin: 'bg-purple-100 text-purple-700',
};

const QUICK_ACTIONS = [
  { label: 'Manage Users', icon: '👥', to: '/admin/users' },
  { label: 'Messages', icon: '✉️', to: '/admin/messages' },
  { label: 'Analytics', icon: '📈', to: '/admin/analytics' },
  { label: 'Settings', icon: '⚙️', to: '/admin/settings' },
];

export default function AdminDashboardDemo() {
  const { isAuthorized } = useAuthCheck('admin');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.getStats(), adminApi.getUsers()])
      .then(([s, u]) => { setStats(s); setUsers(u.slice(0, 5)); })
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (!isAuthorized) return null;

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
  );

  const statCards = [
    { title: 'Total Users',    value: stats?.total_users     ?? '—', icon: '👥' },
    { title: 'Drivers',        value: stats?.total_drivers   ?? '—', icon: '🚛' },
    { title: 'Clients',        value: stats?.total_clients   ?? '—', icon: '🏢' },
    { title: 'Total Messages', value: stats?.total_messages  ?? '—', icon: '✉️' },
    { title: 'Unread',         value: stats?.unread_messages ?? '—', icon: '🔔' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here's the current platform status.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent registrations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Recent Registrations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">No users yet</td></tr>
                ) : users.map(u => (
                  <tr key={u.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-bold shrink-0">
                          {(u.first_name?.[0] ?? u.email[0]).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : u.email}
                          </p>
                          <p className="text-gray-400 text-xs truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${ROLE_CLASS[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-100">
            <Link to="/admin/users" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View all users →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {QUICK_ACTIONS.map(a => (
                <Link key={a.label} to={a.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <span>{a.icon}</span>{a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">System Status</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Server', value: 'Online', ok: true },
                { label: 'Database', value: 'Healthy', ok: true },
                { label: 'Unread messages', value: stats?.unread_messages ?? '—', ok: Number(stats?.unread_messages) === 0 },
              ].map(s => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-gray-500">{s.label}</span>
                  <span className={`font-medium ${s.ok ? 'text-green-600' : 'text-amber-600'}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

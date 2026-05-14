import { useState, useEffect } from 'react';
import { adminApi, AdminStats } from '../../api/admin';

const METRIC_TABS = ['Users', 'Jobs', 'Revenue'];

const ACTIVITY_ICONS: Record<string, string> = {
  user: '👤', job: '📦', admin: '⚙️', payment: '💳',
};

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeMetric, setActiveMetric] = useState('users');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    { title: 'Total Users',       value: loading ? '…' : (stats?.total_users     ?? '—'), icon: '👥',  color: 'text-indigo-600',  bg: 'bg-indigo-50'  },
    { title: 'Drivers',           value: loading ? '…' : (stats?.total_drivers   ?? '—'), icon: '🚛',  color: 'text-green-600',   bg: 'bg-green-50'   },
    { title: 'Clients',           value: loading ? '…' : (stats?.total_clients   ?? '—'), icon: '🏢',  color: 'text-blue-600',    bg: 'bg-blue-50'    },
    { title: 'Total Messages',    value: loading ? '…' : (stats?.total_messages  ?? '—'), icon: '✉️',  color: 'text-purple-600',  bg: 'bg-purple-50'  },
    { title: 'Unread Messages',   value: loading ? '…' : (stats?.unread_messages ?? '—'), icon: '🔔',  color: 'text-amber-600',   bg: 'bg-amber-50'   },
    { title: 'Completion Rate',   value: '94.5%',                                          icon: '✅',  color: 'text-cyan-600',    bg: 'bg-cyan-50'    },
  ];

  const recentActivity = [
    { action: 'New driver registered', user: 'Jonas Petraitis', time: '5 min ago', type: 'user' },
    { action: 'Job completed', user: 'Petras Kazlauskas', time: '12 min ago', type: 'job' },
    { action: 'Advertisement approved', user: 'Admin', time: '25 min ago', type: 'admin' },
    { action: 'New client registered', user: 'UAB Logistika', time: '1 hour ago', type: 'user' },
    { action: 'Payment processed', user: 'System', time: '2 hours ago', type: 'payment' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Platform performance and user insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
            <span>📊</span> Export Report
          </button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map(m => (
          <div key={m.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className={`w-9 h-9 ${m.bg} rounded-lg flex items-center justify-center text-lg mb-3`}>
              {m.icon}
            </div>
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart + activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Platform Activity</h2>
              <div className="flex gap-1">
                {METRIC_TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveMetric(tab.toLowerCase())}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      activeMetric === tab.toLowerCase()
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-sm font-medium">Chart coming soon</p>
              <p className="text-xs mt-1">Recharts integration planned</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-4 space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm shrink-0">
                    {ACTIVITY_ICONS[a.type] ?? '📊'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{a.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.user} · {a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Export Reports</h3>
            <div className="space-y-2">
              {[
                { label: 'Export Users', color: 'bg-indigo-600 hover:bg-indigo-700' },
                { label: 'Export Messages', color: 'bg-green-600 hover:bg-green-700' },
                { label: 'Export Analytics', color: 'bg-purple-600 hover:bg-purple-700' },
              ].map(b => (
                <button key={b.label} className={`w-full px-4 py-2 ${b.color} text-white text-sm font-medium rounded-lg`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

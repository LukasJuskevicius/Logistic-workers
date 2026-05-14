import { Outlet, NavLink, useOutletContext } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/users',     icon: '👥', label: 'Users' },
  { to: '/admin/jobs',      icon: '💼', label: 'Jobs' },
  { to: '/admin/messages',  icon: '✉️', label: 'Messages' },
  { to: '/admin/analytics', icon: '📈', label: 'Analytics' },
  { to: '/admin/languages', icon: '🌐', label: 'Languages' },
  { to: '/admin/settings',  icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const { user } = useOutletContext<{ user: any }>();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (user.role !== 'admin') {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="w-56 shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1 sticky top-24">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
              <div className="my-2 border-t border-gray-200" />
              <NavLink
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>👤</span>
                Back to Profile
              </NavLink>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </div>
  );
}

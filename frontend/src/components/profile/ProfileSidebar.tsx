import { useTranslation } from 'react-i18next';

interface ProfileSidebarProps {
  user: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
}

type MenuItem = {
  id: string;
  icon: string;
  label: string;
  isNavigation?: boolean;
};

export function ProfileSidebar({ user, activeSection, onSectionChange, onNavigate }: ProfileSidebarProps) {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { id: 'overview', icon: '📊', label: t('profile.overview') },
    { id: 'settings', icon: '⚙️', label: t('profile.settings') },
    { id: 'messages', icon: '✉️', label: t('profile.messages') },
    { id: 'documents', icon: '📁', label: t('profile.documents') },
  ];

  const roleSpecificItems: Record<string, MenuItem[]> = {
    admin: [
      { id: 'admin', icon: '👥', label: t('profile.adminDashboard'), isNavigation: true }
    ],
    driver: [
      { id: 'schedule', icon: '📅', label: t('profile.mySchedule') },
      { id: 'earnings', icon: '💰', label: t('profile.earnings') }
    ],
    client: [
      { id: 'orders', icon: '📦', label: t('profile.myOrders') },
      { id: 'invoices', icon: '🧾', label: t('profile.invoices') }
    ]
  };

  const additionalItems = roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.profile_picture || '/avatars/default.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-100 mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-900">
          {user?.first_name} {user?.last_name}
        </h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
        <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
          {user?.role?.toUpperCase()}
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

        {/* Role-specific items */}
        {additionalItems.length > 0 && (
          <>
            <div className="my-3 border-t border-gray-200"></div>
            {additionalItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isNavigation) {
                    onNavigate('admin');
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </>
        )}
      </nav>
    </div>
  );
}

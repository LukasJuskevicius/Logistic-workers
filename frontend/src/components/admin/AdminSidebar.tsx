import { useTranslation } from 'react-i18next';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onNavigate }: AdminSidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { id: 'overview', icon: '📊', label: t('admin.overview') },
    { id: 'users', icon: '👥', label: t('admin.users') },
    { id: 'messages', icon: '✉️', label: t('admin.messages') },
    { id: 'reports', icon: '📈', label: t('admin.reports') }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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
        
        <div className="my-3 border-t border-gray-200"></div>
        
        <button
          onClick={() => onNavigate('profile')}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span>👤</span>
          <span className="text-sm font-medium">{t('admin.backToProfile')}</span>
        </button>
      </nav>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { redirect } from 'react-router-dom';
import { logout } from '../../api/auth/logout';
export function ProfileDropdown({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: '👤', label: t('profile.myProfile'), action: () => redirect('/profile') },
    { icon: '✉️', label: t('profile.messages'), action: () => redirect('/messages') },
    { icon: '⚙️', label: t('profile.settings'), action: () => redirect('/settings') },
    ...(user?.role === 'admin' ? [{ icon: '📊', label: t('profile.dashboard'), action: () => redirect('/admin') }] : []),
    { icon: '🚪', label: t('auth.signOut'), action: () => logout(), className: 'border-t' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img
          src={user?.profile_picture || '/avatars/default.png'}
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-gray-200"
        />
        <span className="text-sm font-medium text-gray-700 hidden lg:block">
          {user?.first_name || user?.email?.split('@')[0]}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 ${item.className || ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

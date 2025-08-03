import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: any;
  onSignOut?: () => void;
}

export function Header({ currentPage, onNavigate, user, onSignOut }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const translations = {
    en: {
      home: 'Home',
      forClients: 'For Clients',
      forDrivers: 'For Drivers',
      vacancies: 'Vacancies',
      myApplications: 'My Applications',
      myProfile: 'My Profile',
      myJobRequests: 'My Job Requests',
      myCompanyProfile: 'My Company Profile',
      contact: 'Contact',
      register: 'Register',
      login: 'Login',
      signOut: 'Sign Out',
      dashboard: 'Dashboard',
      myAccount: 'My Account',
      admin: 'Admin',
      pending: 'Pending Approval'
    },
    lt: {
      home: 'Pradžia',
      forClients: 'Klientams',
      forDrivers: 'Vairuotojams',
      vacancies: 'Darbo skelbimai',
      myApplications: 'Mano prašymai',
      myProfile: 'Mano profilis',
      myJobRequests: 'Mano užklausos',
      myCompanyProfile: 'Įmonės profilis',
      contact: 'Kontaktai',
      register: 'Registracija',
      login: 'Prisijungti',
      signOut: 'Atsijungti',
      dashboard: 'Skydelis',
      myAccount: 'Mano paskyra',
      admin: 'Administracija',
      pending: 'Laukia patvirtinimo'
    },
    nl: {
      home: 'Home',
      forClients: 'Voor Klanten',
      forDrivers: 'Voor Chauffeurs',
      vacancies: 'Vacatures',
      myApplications: 'Mijn Aanvragen',
      myProfile: 'Mijn Profiel',
      myJobRequests: 'Mijn Opdrachten',
      myCompanyProfile: 'Bedrijfsprofiel',
      contact: 'Contact',
      register: 'Registreren',
      login: 'Inloggen',
      signOut: 'Uitloggen',
      dashboard: 'Dashboard',
      myAccount: 'Mijn Account',
      admin: 'Beheer',
      pending: 'Wacht op goedkeuring'
    },
    uk: {
      home: 'Головна',
      forClients: 'Для клієнтів',
      forDrivers: 'Для водіїв',
      vacancies: 'Вакансії',
      myApplications: 'Мої заявки',
      myProfile: 'Мій профіль',
      myJobRequests: 'Мої запити',
      myCompanyProfile: 'Профіль компанії',
      contact: 'Контакти',
      register: 'Реєстрація',
      login: 'Увійти',
      signOut: 'Вийти',
      dashboard: 'Панель керування',
      myAccount: 'Мій акаунт',
      admin: 'Адміністрування',
      pending: 'Очікує підтвердження'
    }
  };

  const text = translations[language] || translations.en;

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Dynamic navigation items based on user state and role
  const getNavigationItems = () => {
    const baseItems = [
      { key: 'home', label: text.home, page: 'home' }
    ];

    if (!user) {
      // Guest user navigation
      return [
        ...baseItems,
        { key: 'clients', label: text.forClients, page: 'clients' },
        { key: 'drivers', label: text.forDrivers, page: 'drivers' },
        { key: 'vacancies', label: text.vacancies, page: 'vacancies' },
        { key: 'contact', label: text.contact, page: 'contact' }
      ];
    }

    // Logged-in user navigation
    const loggedInItems = [...baseItems];

    if (user.type === 'admin') {
      // Admin navigation
      loggedInItems.push(
        { key: 'clients', label: text.forClients, page: 'clients' },
        { key: 'drivers', label: text.forDrivers, page: 'drivers' },
        { key: 'vacancies', label: text.vacancies, page: 'vacancies' },
        { key: 'admin', label: text.admin, page: 'admin' },
        { key: 'contact', label: text.contact, page: 'contact' }
      );
    } else if (user.type === 'driver') {
      // Driver navigation
      loggedInItems.push(
        { key: 'applications', label: text.myApplications, page: 'drivers' },
        { key: 'vacancies', label: text.vacancies, page: 'vacancies' },
        { key: 'profile', label: text.myProfile, page: 'driver-profile' },
        { key: 'clients', label: text.forClients, page: 'clients' },
        { key: 'contact', label: text.contact, page: 'contact' }
      );
    } else if (user.type === 'client') {
      // Client navigation
      loggedInItems.push(
        { key: 'job-requests', label: text.myJobRequests, page: 'clients' },
        { key: 'company-profile', label: text.myCompanyProfile, page: 'client-profile' },
        { key: 'drivers', label: text.forDrivers, page: 'drivers' },
        { key: 'contact', label: text.contact, page: 'contact' }
      );
    }

    return loggedInItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">LW</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Logistic Workers
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.page
                    ? 'text-primary border-b-2 border-primary pb-4'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                        language === lang.code ? 'bg-blue-50 text-primary' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Status Indicator */}
            {user && user.profile?.status === 'pending_verification' && (
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-200">
                {text.pending}
              </div>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => onNavigate(user.type === 'admin' ? 'admin' : 'dashboard')}
                  variant="outline"
                  size="sm"
                >
                  {user.type === 'admin' ? text.admin : text.dashboard}
                </Button>
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  size="sm"
                >
                  {text.signOut}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => onNavigate('register')}
                  variant="outline"
                  size="sm"
                >
                  {text.register}
                </Button>
                <Button
                  onClick={() => onNavigate('login')}
                  size="sm"
                >
                  {text.login}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-gray-50 rounded-md ${
                    currentPage === item.page
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2 border-t border-gray-100 mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left px-2 py-1 text-sm rounded transition-colors flex items-center space-x-2 ${
                        language === lang.code 
                          ? 'bg-blue-50 text-primary' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile User Status */}
              {user && user.profile?.status === 'pending_verification' && (
                <div className="px-3 py-2">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded text-center">
                    {text.pending}
                  </div>
                </div>
              )}

              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <Button
                      onClick={() => {
                        onNavigate(user.type === 'admin' ? 'admin' : 'dashboard');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {user.type === 'admin' ? text.admin : text.dashboard}
                    </Button>
                    <Button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {text.signOut}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        onNavigate('register');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {text.register}
                    </Button>
                    <Button
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      size="sm"
                      className="w-full"
                    >
                      {text.login}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </header>
  );
}
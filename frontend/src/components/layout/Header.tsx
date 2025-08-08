// Simple navigation header with burger menu and language switcher
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogisticWorkersLogo } from '../ui/Logo';

// Define the props interface for the Header component
interface HeaderProps {
  onNavigate: (page: string) => void;  // Function to handle page navigation
  user?: any;                          // Optional user object (for logged in users)
  onSignOut: () => void;               // Function to handle user sign out
}

export function Header({ onNavigate, user, onSignOut }: HeaderProps) {
  // State to control mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get translation function and i18n instance for language switching
  const { t, i18n } = useTranslation();

  // Function to handle navigation and close mobile menu
  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  // Function to handle language change
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    // Modern sticky header with glass/gradient aesthetics
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-backdrop-blur:bg-white/60 border-b border-white/20 shadow-sm">
      {/* subtle gradient bar */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-blue-500/40" />

      {/* Container with max width and responsive padding */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Flex container for header content - logo, nav, buttons */}
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            {/* Clickable logo button */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              {/* Custom SVG logo */}
              <LogisticWorkersLogo size="medium" />
            </button>
          </div>

          {/* Desktop Navigation Menu - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => onNavigate('vacancies')} 
              className="text-sm text-slate-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {t('navigation.vacancies')}
            </button>
            <button 
              onClick={() => onNavigate('clients')} 
              className="text-sm text-slate-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {t('navigation.forClients')}
            </button>
            <button 
              onClick={() => onNavigate('drivers')} 
              className="text-sm text-slate-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {t('navigation.forDrivers')}
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="text-sm text-slate-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {t('navigation.contact')}
            </button>
          </nav>

          {/* Desktop Auth Buttons and Language Switcher - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher Component */}
            <LanguageSwitcher 
              currentLanguage={i18n.language} 
              onLanguageChange={handleLanguageChange} 
            />

            {/* Conditional rendering based on user login status */}
            {user ? (
              <>
                <span className="text-xs lg:text-sm text-slate-700">
                  {t('auth.hello')}, {user.firstName || user.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="bg-red-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm hover:bg-red-700 transition-colors shadow-sm"
                >
                  {t('auth.signOut')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white/80 text-slate-700 border border-slate-200 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm hover:bg-white transition-colors shadow-sm"
                >
                  {t('auth.register')}
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-sm"
                >
                  {t('auth.login')}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button - visible only on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher 
              currentLanguage={i18n.language} 
              onLanguageChange={handleLanguageChange} 
            />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-white/70 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - appears when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/90 backdrop-blur border-b border-white/30 shadow-xl z-50">
            <div className="px-4 py-6 space-y-4">
              <nav className="space-y-3">
                <button 
                  onClick={() => handleNavigate('home')} 
                  className="block w-full text-left text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.home')}
                </button>
                <button 
                  onClick={() => handleNavigate('vacancies')} 
                  className="block w-full text-left text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.vacancies')}
                </button>
                <button 
                  onClick={() => handleNavigate('clients')} 
                  className="block w-full text-left text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.forClients')}
                </button>
                <button 
                  onClick={() => handleNavigate('drivers')} 
                  className="block w-full text-left text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.forDrivers')}
                </button>
                <button 
                  onClick={() => handleNavigate('contact')} 
                  className="block w-full text-left text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.contact')}
                </button>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/40">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-700">
                      {t('auth.hello')}, {user.firstName || user.email}
                    </div>
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      {t('auth.signOut')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNavigate('register')}
                      className="w-full bg-white/80 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors"
                    >
                      {t('auth.register')}
                    </button>
                    <button
                      onClick={() => handleNavigate('login')}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      {t('auth.login')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
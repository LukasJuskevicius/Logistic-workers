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
    // Main header container with white background, shadow, and border
    <header className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      {/* Container with max width and responsive padding */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Flex container for header content - logo, nav, buttons */}
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            {/* Clickable logo button */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              {/* Custom SVG logo */}
              <LogisticWorkersLogo size="small" />
            </button>
          </div>

          {/* Desktop Navigation Menu - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Vacancies navigation button */}
            <button 
              onClick={() => onNavigate('vacancies')} 
              className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.vacancies')}
            </button>
            {/* For Clients navigation button */}
            <button 
              onClick={() => onNavigate('clients')} 
              className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.forClients')}
            </button>
            {/* For Drivers navigation button */}
            <button 
              onClick={() => onNavigate('drivers')} 
              className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.forDrivers')}
            </button>
            {/* Contact navigation button */}
            <button 
              onClick={() => onNavigate('contact')} 
              className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
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
              // If user is logged in - show greeting and sign out button
              <>
                {/* User greeting text */}
                <span className="text-xs lg:text-sm text-gray-700">
                  {t('auth.hello')}, {user.firstName || user.email}
                </span>
                {/* Sign out button */}
                <button
                  onClick={onSignOut}
                  className="bg-red-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md text-xs lg:text-sm hover:bg-red-700 transition-colors"
                >
                  {t('auth.signOut')}
                </button>
              </>
            ) : (
              // If user is not logged in - show register and login buttons
              <>
                {/* Register button */}
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white text-gray-700 border border-gray-300 px-3 py-1.5 lg:px-4 lg:py-2 rounded-md text-xs lg:text-sm hover:bg-gray-50 transition-colors"
                >
                  {t('auth.register')}
                </button>
                {/* Login button */}
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md text-xs lg:text-sm hover:bg-blue-700 transition-colors"
                >
                  {t('auth.login')}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button - visible only on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher 
              currentLanguage={i18n.language} 
              onLanguageChange={handleLanguageChange} 
            />

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {/* Animated hamburger icon with three lines */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                {/* Top line - rotates when menu is open */}
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                {/* Middle line - disappears when menu is open */}
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                {/* Bottom line - rotates when menu is open */}
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - appears when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                {/* Mobile Home button */}
                <button 
                  onClick={() => handleNavigate('home')} 
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.home')}
                </button>
                {/* Mobile Vacancies button */}
                <button 
                  onClick={() => handleNavigate('vacancies')} 
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.vacancies')}
                </button>
                {/* Mobile For Clients button */}
                <button 
                  onClick={() => handleNavigate('clients')} 
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.forClients')}
                </button>
                {/* Mobile For Drivers button */}
                <button 
                  onClick={() => handleNavigate('drivers')} 
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.forDrivers')}
                </button>
                {/* Mobile Contact button */}
                <button 
                  onClick={() => handleNavigate('contact')} 
                  className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  {t('navigation.contact')}
                </button>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  // If user is logged in - show greeting and sign out button
                  <div className="space-y-3">
                    {/* Mobile user greeting */}
                    <div className="text-sm text-gray-700">
                      {t('auth.hello')}, {user.firstName || user.email}
                    </div>
                    {/* Mobile sign out button */}
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      {t('auth.signOut')}
                    </button>
                  </div>
                ) : (
                  // If user is not logged in - show register and login buttons
                  <div className="space-y-3">
                    {/* Mobile register button */}
                    <button
                      onClick={() => handleNavigate('register')}
                      className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    >
                      {t('auth.register')}
                    </button>
                    {/* Mobile login button */}
                    <button
                      onClick={() => handleNavigate('login')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
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
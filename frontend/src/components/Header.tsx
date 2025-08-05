// Simple navigation header with burger menu
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  user?: any;
  onSignOut: () => void;
}

export function Header({ onNavigate, user, onSignOut }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false); // Close menu when navigating
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">LW</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Logistic Workers
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('vacancies')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Vacancies
            </button>
            <button 
              onClick={() => onNavigate('clients')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              For Clients
            </button>
            <button 
              onClick={() => onNavigate('drivers')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              For Drivers
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  Hello, {user.firstName || user.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                <button 
                  onClick={() => handleNavigate('home')} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigate('vacancies')} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  Vacancies
                </button>
                <button 
                  onClick={() => handleNavigate('clients')} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  For Clients
                </button>
                <button 
                  onClick={() => handleNavigate('drivers')} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  For Drivers
                </button>
                <button 
                  onClick={() => handleNavigate('contact')} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  Contact
                </button>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-700">
                      Hello, {user.firstName || user.email}
                    </div>
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNavigate('register')}
                      className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleNavigate('login')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Login
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
import { BackgroundPattern } from '../ui/BackgroundPattern';
import { useTranslation } from 'react-i18next';

// Simple footer component
interface FooterProps {
  onNavigate: (page: string) => void;
}

// Function to get current year
const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = getCurrentYear();
  const { t } = useTranslation();

  return (
    <BackgroundPattern 
      pattern="grid" 
      opacity={0.03}
      className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 w-20 h-20 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="60" r="6" fill="white" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-12 h-12 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" fill="white" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 w-10 h-10 opacity-8 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="6" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="35" cy="35" r="2" fill="white" />
            <circle cx="65" cy="35" r="2" fill="white" />
            <circle cx="35" cy="65" r="2" fill="white" />
            <circle cx="65" cy="65" r="2" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="relative">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs mb-4">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></div>
              <span className="text-blue-300 font-medium">{t('footer.aboutUs')}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('footer.companyName')}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="relative">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs mb-4">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
              <span className="text-green-300 font-medium">{t('footer.navigation')}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('footer.quickLinks')}
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('home')}
                className="block text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              >
                {t('footer.home')}
              </button>
              <button 
                onClick={() => onNavigate('vacancies')}
                className="block text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              >
                {t('footer.vacancies')}
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="block text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              >
                {t('footer.contact')}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs mb-4">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1.5"></div>
              <span className="text-purple-300 font-medium">{t('footer.contactInfo')}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('footer.contact')}
            </h3>
            <div className="text-gray-300 space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>{t('footer.email')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>{t('footer.phone')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced copyright section */}
        <div className="border-t border-gray-700 mt-8 md:mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm md:text-base">
              &copy; {currentYear} {t('footer.companyName')}. {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-xs">{t('footer.madeWithLove')}</span>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}
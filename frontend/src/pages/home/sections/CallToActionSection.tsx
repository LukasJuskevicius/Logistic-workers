import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { useTranslation } from 'react-i18next';

interface Props {
  // Reuse page navigation in footer CTA
  onNavigate: (page: string) => void;
}

export function CallToActionSection({ onNavigate }: Props) {
  const { t } = useTranslation();

  return (
    <BackgroundPattern 
      pattern="waves" 
      opacity={0.1}
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 opacity-20 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 w-24 h-24 opacity-20 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="60" r="8" fill="white" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-20 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 w-12 h-12 opacity-15 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="8" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="35" cy="35" r="3" fill="white" />
            <circle cx="65" cy="35" r="3" fill="white" />
            <circle cx="35" cy="65" r="3" fill="white" />
            <circle cx="65" cy="65" r="3" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Enhanced header with badge */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-1.5 md:mr-2 animate-pulse"></div>
            <span className="text-white font-medium">{t('home.hero.getStartedButton')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
            {t('home.callToAction.title')}
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto px-2">
            {t('home.callToAction.subtitle')}
          </p>
        </div>

        {/* Enhanced buttons with artistic elements */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <button
            onClick={() => onNavigate('clients')}
            className="group relative bg-white text-blue-600 px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {t('home.callToAction.buttons.lookingForDrivers')}
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('drivers')}
            className="group relative bg-transparent text-white border-2 border-white px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              {t('home.callToAction.buttons.lookingForJob')}
            </div>
          </button>
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mb-12 relative">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#cta-gradient)" />
            <defs>
              <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}



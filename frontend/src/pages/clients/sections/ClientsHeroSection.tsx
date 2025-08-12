import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { useTranslation } from 'react-i18next';
import { clientStats } from '../data/clients';
import { redirect } from 'react-router-dom';

export function ClientsHeroSection() {
  const { t } = useTranslation();
  return (
    <BackgroundPattern 
      pattern="waves" 
      opacity={0.05}
      className="relative py-16 md:py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-28 h-28 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="60" r="8" fill="white" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-8 animate-pulse">
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
            <span className="text-white font-medium">{t('clients.hero.badge')}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
            {t('clients.hero.title')}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto px-2 mb-8 md:mb-12">{t('clients.hero.subtitle')}</p>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
            {clientStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-green-200 text-xs md:text-sm">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <button
            onClick={() => redirect('/contact')}
            className="group bg-white text-green-600 px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('clients.hero.ctaGetStarted')}
            </div>
          </button>
          
          <button
            onClick={() => redirect('/')}
            className="group bg-transparent text-white border-2 border-white px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t('clients.hero.backToHome')}
            </div>
          </button>
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-12 relative">
          <svg viewBox="0 0 1200 80" fill="none" className="w-full h-auto">
            <path d="M0 80 L0 40 Q300 0 600 40 T1200 40 L1200 80 Z" fill="url(#clients-hero-gradient)" />
            <defs>
              <linearGradient id="clients-hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}

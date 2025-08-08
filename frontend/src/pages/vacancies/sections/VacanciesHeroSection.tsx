import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';

interface VacanciesHeroSectionProps {
  onNavigate: (page: string) => void;
}

export function VacanciesHeroSection({ onNavigate }: VacanciesHeroSectionProps) {
  return (
    <BackgroundPattern 
      pattern="waves" 
      opacity={0.05}
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden"
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
            <span className="text-white font-medium">Live Opportunities</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
            Available Vacancies
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto px-2 mb-8 md:mb-12">
            Find your next opportunity in the logistics industry across Europe
          </p>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-200 text-sm md:text-base">Active Positions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">8</div>
              <div className="text-blue-200 text-sm md:text-base">European Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24h</div>
              <div className="text-blue-200 text-sm md:text-base">Response Time</div>
            </div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="group bg-white text-blue-600 px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              Apply Now
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="group bg-transparent text-white border-2 border-white px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </div>
          </button>
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-12 relative">
          <svg viewBox="0 0 1200 80" fill="none" className="w-full h-auto">
            <path d="M0 80 L0 40 Q300 0 600 40 T1200 40 L1200 80 Z" fill="url(#vacancies-hero-gradient)" />
            <defs>
              <linearGradient id="vacancies-hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

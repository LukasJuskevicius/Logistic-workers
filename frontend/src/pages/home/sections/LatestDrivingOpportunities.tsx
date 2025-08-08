import { Carousel } from '../../../components/ui/Carousel';
import { VacancyCard } from '../../../components/sections/VacancyCard';
import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { latestDrivingOpportunities } from '../data/LatestDrivingOpportunities';

interface Props {
  // Pass navigation to carousel buttons
  onNavigate: (page: string) => void;
}

// Enhanced Latest Driving Opportunities section with improved mobile design
export function LatestDrivingOpportunities({ onNavigate }: Props) {
  return (
    <BackgroundPattern 
      pattern="grid" 
      opacity={0.02}
      className="relative py-12 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Floating decorative elements - hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-28 h-28 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="35" cy="35" r="3" fill="currentColor" />
            <circle cx="65" cy="35" r="3" fill="currentColor" />
            <circle cx="35" cy="65" r="3" fill="currentColor" />
            <circle cx="65" cy="65" r="3" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-20 w-20 h-20 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 50 L50 20 L80 50 L50 80 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="8" fill="white" />
          </svg>
        </div>
        
        <div className="absolute bottom-40 left-1/3 w-16 h-16 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="15" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced header section with mobile optimization */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
          <div className="text-center">
            {/* Badge - smaller on mobile */}
            
            
            {/* Main heading - responsive text sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Latest Driving Opportunities
            </h2>
            
            {/* Enhanced subtitle - better mobile spacing */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Discover exciting career opportunities with leading logistics companies across Europe. 
              <span className="block mt-1 md:mt-2 text-xs sm:text-sm text-blue-600 font-medium">
                New positions added daily • Competitive salaries • Professional growth
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced carousel with mobile optimization */}
        <div className="relative">
          <Carousel
            items={latestDrivingOpportunities}
            renderItem={(vacancy) => (
              <VacancyCard vacancy={vacancy} onNavigate={onNavigate} />
            )}
            onNavigate={onNavigate}
            navigationButtonText="View All Vacancies"
          />
        </div>

        {/* Bottom decorative elements - simplified for mobile */}
        <div className="mt-8 md:mt-16 relative">
          {/* Category indicators - responsive layout */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-4">
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">International</span>
            </div>
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">Local</span>
            </div>
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">Specialized</span>
            </div>
          </div>
          
          {/* Decorative wave - hidden on mobile for cleaner look */}
          <div className="hidden md:block">
            <svg viewBox="0 0 1200 80" fill="none" className="w-full h-auto">
              <path d="M0 80 L0 40 Q300 0 600 40 T1200 40 L1200 80 Z" fill="url(#opportunities-gradient)" />
              <defs>
                <linearGradient id="opportunities-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}

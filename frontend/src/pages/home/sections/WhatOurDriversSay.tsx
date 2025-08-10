import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { Carousel } from '../../../components/ui/Carousel';
import { TestimonialCard } from '../../../components/sections/TestimonialCard';
import { testimonials } from '../data/testimonials';
import { useTranslation } from 'react-i18next';

// Enhanced What Our Drivers Say section with improved mobile design
export function WhatOurDriversSay() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern 
      pattern="dots" 
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Floating decorative elements - hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 right-10 w-24 h-24 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-10 w-32 h-32 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" fill="currentColor" />
            <circle cx="50" cy="60" r="8" fill="white" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced header section with mobile optimization */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
          <div className="text-center">
            {/* Main heading - responsive text sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              {t('home.testimonials.title')}
            </h2>
            
            {/* Enhanced subtitle - better mobile spacing */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              {t('home.testimonials.subtitle')}
              <span className="block mt-1 md:mt-2 text-xs sm:text-sm text-blue-600 font-medium">
                {t('home.hero.stats.activeDrivers')} • {t('home.hero.stats.partnerCompanies')} • {t('home.hero.stats.successfulPlacements')}
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced carousel with mobile optimization */}
        <div className="relative">
          <Carousel
            items={testimonials}
            renderItem={(testimonial) => (
              <TestimonialCard testimonial={testimonial} />
            )}
          />
        </div>

        {/* Bottom decorative elements - simplified for mobile */}
        <div className="mt-8 md:mt-16 relative">
          {/* Trust indicators - responsive layout */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-4">
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">{t('home.testimonials.trustIndicators.fiveStarReviews')}</span>
            </div>
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">{t('home.testimonials.trustIndicators.verifiedDrivers')}</span>
            </div>
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-gray-600">{t('home.testimonials.trustIndicators.europeWide')}</span>
            </div>
          </div>
          
          {/* Decorative wave - hidden on mobile for cleaner look */}
          <div className="hidden md:block">
            <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
              <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#testimonials-gradient)" />
              <defs>
                <linearGradient id="testimonials-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}

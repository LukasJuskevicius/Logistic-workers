import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { EnhancedCard } from '../../../components/ui/EnhancedCard';
import { useTranslation } from 'react-i18next';

// Enhanced "Partner You Can Rely On" section with improved mobile design
export function WhyChooseUsSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('home.whyChooseUs.features.vettedProfessionals.title'),
      description: t('home.whyChooseUs.features.vettedProfessionals.description'),
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('home.whyChooseUs.features.fastEfficient.title'),
      description: t('home.whyChooseUs.features.fastEfficient.description'),
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
        </svg>
      ),
      title: t('home.whyChooseUs.features.personalSupport.title'),
      description: t('home.whyChooseUs.features.personalSupport.description'),
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <BackgroundPattern 
      pattern="circles" 
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
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header with mobile optimization */}
        <div className="text-center mb-8 md:mb-16">
          {/* Badge - smaller on mobile */}
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6">
            <span className="text-blue-600 font-medium">{t('home.whyChooseUs.badge')}</span>
          </div>
          
          {/* Main heading - responsive text sizes */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            {t('home.whyChooseUs.title')}
          </h2>
          
          {/* Enhanced subtitle - better mobile spacing */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {t('home.whyChooseUs.subtitle')}
          </p>
        </div>

        {/* Enhanced feature cards with mobile optimization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={index}
              variant="elevated"
              className="text-center group hover:transform hover:scale-105 transition-all duration-500"
            >
              {/* Enhanced icon container - smaller on mobile */}
              <div className="mb-6 md:mb-8 flex justify-center">
                <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                  {feature.icon}
                </div>
              </div>
              
              {/* Enhanced content - better mobile spacing */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </BackgroundPattern>
  );
}



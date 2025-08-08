import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { EnhancedCard } from '../../../components/ui/EnhancedCard';
import { clientServices } from '../data/clients';

export function ClientsServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 14l3-3m0 0l3 3m-3-3v12m0 0l-3-3m3 3l3-3M3 3h18M3 9h18M3 15h18" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'support':
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <BackgroundPattern 
      pattern="circles" 
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-24 h-24 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 animate-bounce">
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
        {/* Enhanced header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-1.5 md:mr-2"></div>
            <span className="text-green-700 font-medium">Our Services</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900 bg-clip-text text-transparent">
            Comprehensive Solutions
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            We provide end-to-end driver recruitment and management services to meet all your logistics needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {clientServices.map((service) => (
            <EnhancedCard key={service.id} variant="elevated" className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {getIcon(service.icon)}
                  </div>
                  {/* Decorative circles around icon */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 md:w-6 md:h-6 bg-green-200 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-emerald-200 rounded-full opacity-60"></div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  {service.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="w-full mb-4 md:mb-6">
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Time Frame */}
                <div className="mt-auto">
                  <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                    <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.timeFrame}
                  </div>
                </div>
              </div>
            </EnhancedCard>
          ))}
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-16 relative hidden md:block">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#services-gradient)" />
            <defs>
              <linearGradient id="services-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}

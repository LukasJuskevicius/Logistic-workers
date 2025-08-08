import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { clientRequirements } from '../data/clients';

export function ClientsRequirementsSection() {
  return (
    <BackgroundPattern 
      pattern="circles" 
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden"
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
            <span className="text-green-700 font-medium">What We Need</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900 bg-clip-text text-transparent">
            Requirements & Process
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            To provide you with the best service, we need some information from your company
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {clientRequirements.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-6 md:mb-8">
                {/* Category Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4 md:mb-6">
                  {index === 0 && (
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>

                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  {category.category}
                </h3>
              </div>

              {/* Requirements List */}
              <ul className="space-y-3 md:space-y-4">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm md:text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-200">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Don't worry if you don't have all documents ready. We can help you gather the necessary information and guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick Response Time
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Expert Guidance
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Free Consultation
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-16 relative hidden md:block">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#requirements-gradient)" />
            <defs>
              <linearGradient id="requirements-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

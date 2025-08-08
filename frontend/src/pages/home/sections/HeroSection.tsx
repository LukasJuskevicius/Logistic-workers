import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

// Enhanced hero section with visual appeal and SVG decorations
export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <BackgroundPattern 
      pattern="waves" 
      opacity={0.05}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M30 50 L70 50 M50 30 L50 70" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-20 w-24 h-24 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 50 Q50 20 80 50 Q50 80 20 50 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute bottom-40 left-20 w-20 h-20 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <circle cx="50" cy="20" r="4" fill="currentColor" />
            <circle cx="80" cy="50" r="4" fill="currentColor" />
            <circle cx="50" cy="80" r="4" fill="currentColor" />
            <circle cx="20" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main heading with enhanced typography */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            Driving Your Business Forward
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connecting professional drivers with leading logistics companies across Europe
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => onNavigate('vacancies')}
              className="group relative px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center">
                Find Your Next Opportunity
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Get Started Today
            </button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">500+</div>
              <div className="text-blue-100">Active Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">50+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">1000+</div>
              <div className="text-blue-100">Successful Placements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
          <path d="M0 120 L0 60 Q300 0 600 60 T1200 60 L1200 120 Z" fill="white" />
        </svg>
      </div>
    </BackgroundPattern>
  );
}



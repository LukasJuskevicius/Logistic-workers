import { useState, useEffect } from 'react';

// Interface for vacancy data
interface Vacancy {
  id: number;
  title: string;
  location: string;
  description: string;
}

// Props for the carousel component
interface VacancyCarouselProps {
  onNavigate: (page: string) => void;
}

// Sample vacancy data
const vacancies: Vacancy[] = [
  {
    id: 1,
    title: "CE Category Driver",
    location: "International Routes",
    description: "Long-distance driving across Europe with competitive rates and excellent benefits."
  },
  {
    id: 2,
    title: "Local Delivery Driver", 
    location: "Lithuania",
    description: "Local delivery routes with regular hours and family-friendly schedule."
  },
  {
    id: 3,
    title: "Warehouse to Store Driver",
    location: "Poland", 
    description: "Distribution driving with modern vehicles and comprehensive training."
  },
  {
    id: 4,
    title: "Refrigerated Transport Driver",
    location: "Netherlands",
    description: "Specialized cold chain logistics with temperature-controlled vehicles."
  },
  {
    id: 5,
    title: "Express Delivery Driver",
    location: "Germany",
    description: "Fast-paced delivery with premium rates and flexible scheduling."
  },
  {
    id: 6,
    title: "Heavy Goods Vehicle Driver",
    location: "Belgium",
    description: "Large vehicle operation with comprehensive benefits and training."
  }
];

export function VacancyCarousel({ onNavigate }: VacancyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate max index based on screen size
  const maxIndex = vacancies.length - 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Latest Driving Opportunities
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover exciting career opportunities with leading logistics companies across Europe
          </p>
        </div>
        
        {/* Carousel Container with proper structure */}
        <div className="relative">
          {/* Navigation arrows - positioned outside the card container */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
            aria-label="Previous vacancies"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
            aria-label="Next vacancies"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards container with proper spacing for current + preview */}
          <div className="px-12 md:px-16 lg:px-20">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
              
              {/* Cards wrapper - show current card fully + 20% of next */}
              <div className="flex transition-all duration-500 ease-out"
                   style={{ 
                     transform: `translateX(-${currentIndex * 80}%)`
                   }}>
                
                {/* Map through all vacancies */}
                {vacancies.map((vacancy, index) => (
                  <div key={vacancy.id} 
                       className={`flex-shrink-0 transition-all duration-300 ${
                         isMobile 
                           ? 'w-[80%]' // Current card takes 80% on mobile
                           : 'w-[80%]'  // Current card takes 80% on desktop
                       }`}>
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-8 h-full border border-gray-100 hover:border-blue-200 group">
                      {/* Card Header */}
                      <div className="mb-4 md:mb-6">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="text-xs md:text-sm text-gray-500 font-medium">
                            #{vacancy.id.toString().padStart(2, '0')}
                          </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {vacancy.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-3 md:mb-4">
                          <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm md:text-base font-medium">{vacancy.location}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="mb-4 md:mb-6">
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {vacancy.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-auto">
                        <button 
                          onClick={() => onNavigate('vacancies')}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                        >
                          View Details
                          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 md:mt-8">
            <div className="flex space-x-1 md:space-x-2">
              {Array.from({ length: vacancies.length }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={() => onNavigate('vacancies')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            View All Vacancies
            <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
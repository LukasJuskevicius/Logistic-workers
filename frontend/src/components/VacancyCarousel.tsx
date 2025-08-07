import { useState } from 'react';

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
  // State to track current slide position
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate how many cards to show based on screen size
  const getCardsToShow = () => {
    // On large screens: show 3 cards
    // On medium screens: show 2 cards  
    // On small screens: show 1 card with carousel
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm and below
    }
    return 3; // Default fallback
  };

  // Calculate total slides based on cards to show
  const cardsToShow = getCardsToShow();
  const totalSlides = Math.ceil(vacancies.length / cardsToShow);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Get current cards to display
  const getCurrentCards = () => {
    const startIndex = currentIndex * cardsToShow;
    return vacancies.slice(startIndex, startIndex + cardsToShow);
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Driving Opportunities
          </h2>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Main carousel container */}
          <div className="relative overflow-hidden">
            
            {/* Cards container */}
            <div className="flex transition-transform duration-300 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              
              {/* Map through current cards to display */}
              {getCurrentCards().map((vacancy) => (
                <div key={vacancy.id} 
                     className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white h-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {vacancy.title}
                    </h3>
                    <p className="text-gray-600 mb-2">📍 {vacancy.location}</p>
                    <p className="text-gray-600 mb-4">
                      {vacancy.description}
                    </p>
                    <button 
                      onClick={() => onNavigate('vacancies')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - only show on smaller screens or when needed */}
          <div className="hidden md:block lg:hidden">
            {/* Previous arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous vacancies"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Next vacancies"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator - show on smaller screens */}
          <div className="flex justify-center mt-6 md:hidden">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('vacancies')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Vacancies
          </button>
        </div>
      </div>
    </div>
  );
} 
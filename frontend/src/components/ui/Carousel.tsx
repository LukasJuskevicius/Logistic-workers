import { useState, useEffect, ReactNode, useRef } from 'react';

// Generic carousel props interface
interface CarouselProps {
  items: any[];
  renderItem: (item: any, index: number) => ReactNode;
  title?: string;
  subtitle?: string;
  onNavigate?: (page: string) => void;
  navigationButtonText?: string;
  navigationButtonAction?: () => void;
}

// Generic carousel component - can display any type of data
export function Carousel({ 
  items, 
  renderItem, 
  title, 
  subtitle, 
  onNavigate, 
  navigationButtonText,
  navigationButtonAction 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [maxCardHeight, setMaxCardHeight] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate maximum card height for perfect alignment
  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = cardRefs.current
        .filter(ref => ref !== null)
        .map(ref => ref?.offsetHeight || 0);
      
      const maxHeight = Math.max(...heights);
      if (maxHeight > 0) {
        setMaxCardHeight(maxHeight);
      }
    };

    // Calculate after a short delay to ensure all cards are rendered
    const timer = setTimeout(calculateMaxHeight, 100);
    return () => clearTimeout(timer);
  }, [items]);

  // Calculate max index based on screen size
  const maxIndex = items.length - 1;

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
        {title && (
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Carousel Container with proper structure */}
        <div className="relative">
          {/* Navigation arrows - positioned outside the card container */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
            aria-label="Previous item"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
            aria-label="Next item"
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
                
                {/* Map through all items using the render function */}
                {items.map((item, index) => (
                  <div key={index} 
                       className={`flex-shrink-0 transition-all duration-300 ${
                         isMobile 
                           ? 'w-[80%]' // Current card takes 80% on mobile
                           : 'w-[80%]'  // Current card takes 80% on desktop
                       }`}>
                    {/* Card container with calculated height for perfect alignment */}
                    <div 
                      ref={el => cardRefs.current[index] = el}
                      className="h-full"
                      style={{ 
                        minHeight: maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto'
                      }}
                    >
                      {renderItem(item, index)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 md:mt-8">
            <div className="flex space-x-1 md:space-x-2">
              {Array.from({ length: items.length }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Button */}
        {(navigationButtonText || onNavigate) && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={navigationButtonAction || (() => onNavigate?.('vacancies'))}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              {navigationButtonText || 'View All'}
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

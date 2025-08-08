import backgroundImage from '../images/background-image.jpg';
import { VacancyCarousel } from '../components/VacancyCarousel';
import { useState, useEffect } from 'react';

// Homepage with comprehensive layout
interface HomePageProps {
  onNavigate: (page: string) => void;
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Michael Schmidt",
    role: "Professional Driver",
    company: "5+ Years Experience",
    avatar: "MS",
    quote: "I found my dream job through Logistic Workers. They really care about matching drivers with the right companies and working conditions. The support team is always there when you need them.",
    rating: 5,
    location: "Germany"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "Logistics Inc.",
    avatar: "SJ",
    quote: "Finding reliable drivers was a nightmare until we found Logistic Workers. Professional service from start to finish. They've helped us scale our operations significantly.",
    rating: 5,
    location: "Netherlands"
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    role: "International Driver",
    company: "8+ Years Experience",
    avatar: "CR",
    quote: "Working with Logistic Workers has been amazing. They understand the industry and always find the best opportunities. Great pay and excellent working conditions.",
    rating: 5,
    location: "Spain"
  },
  {
    id: 4,
    name: "Anna Kowalski",
    role: "Fleet Manager",
    company: "Transport Solutions Ltd",
    avatar: "AK",
    quote: "The quality of drivers we get through Logistic Workers is outstanding. They're professional, reliable, and well-trained. Highly recommended!",
    rating: 5,
    location: "Poland"
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Long-haul Driver",
    company: "10+ Years Experience",
    avatar: "DT",
    quote: "Logistic Workers made the job search process so smooth. They found me a position that perfectly matches my skills and preferences. Couldn't be happier!",
    rating: 5,
    location: "UK"
  },
  {
    id: 6,
    name: "Elena Popescu",
    role: "HR Manager",
    company: "European Logistics",
    avatar: "EP",
    quote: "We've been working with Logistic Workers for over 2 years now. Their drivers are consistently professional and reliable. They've become our trusted recruitment partner.",
    rating: 5,
    location: "Romania"
  }
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScreenSize('small-phone');
      } else if (width < 768) {
        setScreenSize('phone');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isMobile = screenSize === 'small-phone' || screenSize === 'phone';
  const maxIndex = testimonials.length - 1;

  const goToPreviousTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  // Get card width based on screen size
  const getCardWidth = () => {
    switch (screenSize) {
      case 'small-phone':
        return 'w-[85%]';
      case 'phone':
        return 'w-[80%]';
      case 'tablet':
        return 'w-[75%]';
      default:
        return 'w-[80%]';
    }
  };

  // Get transform percentage based on screen size
  const getTransformPercentage = () => {
    switch (screenSize) {
      case 'small-phone':
        return 85;
      case 'phone':
        return 80;
      case 'tablet':
        return 75;
      default:
        return 80;
    }
  };

  return (
    <div>
      {/* Hero Section - The First Impression */}
      <div className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center" 
           style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Main content container - centered and responsive */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The Driving Force Behind Your Business. The Career Path for Your Future.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto">
            We are a specialist recruitment agency dedicated to matching professional lorry drivers 
            with leading logistics companies across the Netherlands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('clients')}
              className="bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              FIND RELIABLE DRIVERS
            </button>
            <button
              onClick={() => onNavigate('drivers')}
              className="bg-white text-gray-900 px-8 py-4 text-lg font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              FIND DRIVING JOBS
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-200 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Partner You Can Rely On
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vetted Professionals</h3>
              <p className="text-gray-600">
                We rigorously screen every driver to ensure quality and reliability.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast & Efficient</h3>
              <p className="text-gray-600">
                We fill your vacancies quickly to keep your business moving.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Support</h3>
              <p className="text-gray-600">
                Dedicated support for both our clients and our drivers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Driving Opportunities Section */}
      <VacancyCarousel onNavigate={onNavigate} />

      {/* What Our Drivers Say - Modern Carousel */}
      <div className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              What Our Drivers Say
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Real testimonials from our satisfied drivers and clients across Europe
            </p>
          </div>
          
          {/* Testimonials Carousel Container */}
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={goToPreviousTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 group"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonials container */}
            <div className="px-12 md:px-16 lg:px-20">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                
                {/* Testimonials wrapper */}
                <div className="flex transition-all duration-500 ease-out"
                     style={{ 
                       transform: `translateX(-${currentTestimonialIndex * getTransformPercentage()}%)`
                     }}>
                  
                  {/* Map through all testimonials */}
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} 
                         className={`flex-shrink-0 transition-all duration-300 ${getCardWidth()}`}>
                      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 h-full border border-gray-100 hover:border-blue-200 group">
                        
                        {/* Quote Icon */}
                        <div className="mb-6 flex justify-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="mb-6">
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed italic mb-4">
                            "{testimonial.quote}"
                          </p>
                          
                          {/* Star Rating */}
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                            <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                            <p className="text-gray-500 text-xs">{testimonial.company} • {testimonial.location}</p>
                          </div>
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
                {Array.from({ length: testimonials.length }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonialIndex 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Call to Action Section */}
      <div className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('clients')}
              className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              I'M LOOKING FOR DRIVERS
            </button>
            <button
              onClick={() => onNavigate('drivers')}
              className="bg-transparent text-white border-2 border-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-white hover:text-blue-600 transition-colors"
            >
              I'M LOOKING FOR A JOB
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
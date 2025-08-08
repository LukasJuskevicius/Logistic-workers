import backgroundImage from '../images/background-image.jpg';
import { VacancyCarousel } from '../components/VacancyCarousel';

// Homepage with comprehensive layout
interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
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

      {/* What Our Drivers Say */}
      <div className="bg-gray-200 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Drivers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Business Owner</h4>
                  <p className="text-gray-600">Logistics Inc.</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finding a reliable driver was a nightmare until we found Logistic Workers. 
                Professional service from start to finish."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Professional Driver</h4>
                  <p className="text-gray-600">5+ Years Experience</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I found my dream job through Logistic Workers. They really care about 
                matching drivers with the right companies and working conditions."
              </p>
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
import backgroundImage from '../../../images/background-image.jpg';

interface Props {
  // Bubbles nav actions up to parent page
  onNavigate: (page: string) => void;
}

// First fold hero with CTA buttons
export function HeroSection({ onNavigate }: Props) {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
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
  );
}



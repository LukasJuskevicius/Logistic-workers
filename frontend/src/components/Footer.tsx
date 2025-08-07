// Simple footer component
interface FooterProps {
  onNavigate: (page: string) => void;
}

// Function to get current year
const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = getCurrentYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Logistic Workers</h3>
            <p className="text-gray-300">
              Connecting skilled drivers with transportation companies across Europe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('home')}
                className="block text-gray-300 hover:text-white"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('vacancies')}
                className="block text-gray-300 hover:text-white"
              >
                Vacancies
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="block text-gray-300 hover:text-white"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@logisticworkers.com</p>
              <p>Phone: +370 600 00000</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Logistic Workers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
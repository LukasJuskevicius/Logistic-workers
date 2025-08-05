// Simple clients page
interface ClientsPageProps {
  onNavigate: (page: string) => void;
}

export function ClientsPage({ onNavigate }: ClientsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            For Clients
          </h1>
          <p className="text-lg text-gray-600">
            Find qualified drivers for your transportation company
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Find Drivers
            </h3>
            <p className="text-gray-600">
              Access a large pool of verified, experienced drivers ready to work.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Post Jobs
            </h3>
            <p className="text-gray-600">
              Create job postings and receive applications from qualified candidates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fast Hiring
            </h3>
            <p className="text-gray-600">
              Streamlined process to quickly find and hire the right drivers.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('register')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 mr-4"
          >
            Register as Client
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
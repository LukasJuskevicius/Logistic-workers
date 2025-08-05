// Simple drivers page
interface DriversPageProps {
  onNavigate: (page: string) => void;
}

export function DriversPage({ onNavigate }: DriversPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            For Drivers
          </h1>
          <p className="text-lg text-gray-600">
            Join our platform and find the perfect driving job for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🚛</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Find Jobs
            </h3>
            <p className="text-gray-600">
              Browse through hundreds of verified job opportunities across Europe.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Verified
            </h3>
            <p className="text-gray-600">
              Complete our verification process to increase your chances of getting hired.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Earn More
            </h3>
            <p className="text-gray-600">
              Connect with companies offering competitive salaries and benefits.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('register')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 mr-4"
          >
            Register as Driver
          </button>
          <button
            onClick={() => onNavigate('vacancies')}
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
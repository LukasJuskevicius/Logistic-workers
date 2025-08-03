interface DriversPageProps {
  onNavigate: (page: string) => void;
}

export function DriversPage({ onNavigate }: DriversPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">For Drivers</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find driving opportunities across Europe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Browse Jobs</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore available driving positions that match your skills and preferences.
                </p>
                <button
                  onClick={() => onNavigate('vacancies')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Vacancies
                </button>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Register</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Create your driver profile to start applying for positions.
                </p>
                <button
                  onClick={() => onNavigate('register')}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Contact Us</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Have questions? Get in touch with our team for support.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
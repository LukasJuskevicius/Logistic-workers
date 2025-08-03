
import { useAuth } from '../hooks/useAuth';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect Drivers with 
              <span className="text-blue-600"> Opportunities</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The premier platform connecting skilled drivers from Lithuania, Ukraine, and beyond 
              with transportation companies across Europe.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!user ? (
                <>
                  <button
                    onClick={() => onNavigate('drivers')}
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    I'm a Driver
                  </button>
                  <button
                    onClick={() => onNavigate('clients')}
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    I'm an Employer
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate(user.type === 'admin' ? 'admin' : user.type === 'driver' ? 'driver-dashboard' : 'client-dashboard')}
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for logistics employment
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  For Drivers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Find verified employment opportunities across Europe. Upload your credentials and get matched with companies that need your skills.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  For Employers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Access a pool of qualified, verified drivers. Post jobs and get applications from experienced professionals ready to work.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Verified Process
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">All drivers and companies go through our verification process to ensure quality and legitimacy for all parties.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
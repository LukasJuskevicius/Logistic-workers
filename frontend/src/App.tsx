// Main app with React Router loader/action pattern
import { 
  createBrowserRouter, 
  RouterProvider, 
  Outlet, 
  useLoaderData,
  useNavigate,
  useNavigation 
} from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import pages
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VacanciesPage } from './pages/vacancies/VacanciesPage';
import { ContactPage } from './pages/contact/ContactPage';
import { DriversPage } from './pages/drivers';
import { ClientsPage } from './pages/clients/ClientsPage';

// Import components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Import loaders and actions
import { authLoader } from './routes/loaders/authLoader';
import { loginAction } from './routes/actions/loginAction';
import { registerAction } from './routes/actions/registerAction';

// Import API functions
import { logout } from './api/auth/logout';

// Root layout component
function RootLayout() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loaderData = useLoaderData() as { user: any } | null;
  const [user, setUser] = useState(loaderData?.user || null);

  // Log navigation state for debugging
  useEffect(() => {
    console.log('[APP] Navigation state:', navigation.state);
    console.log('[APP] Current user:', user);
  }, [navigation.state, user]);

  // Update user when loader data changes
  useEffect(() => {
    console.log('[APP] Loader data changed:', loaderData);
    if (loaderData?.user) {
      setUser(loaderData.user);
    }
  }, [loaderData]);

  const handleNavigate = (page: string) => {
    console.log('[APP] Navigating to:', page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const handleSignOut = async () => {
    console.log('[APP] Signing out...');
    try {
      await logout();
      console.log('[APP] Logout successful');
    } catch (error) {
      console.error('[APP] Logout error:', error);
    } finally {
      // Clear user state
      setUser(null);
      console.log('[APP] User state cleared, redirecting to home');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} user={user} onSignOut={handleSignOut} />
      
      <main className="pt-16">
        {navigation.state === 'loading' && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 animate-pulse z-50" />
        )}
        <Outlet context={{ user, setUser }} />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// Create router with loaders and actions
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <HomePage onNavigate={(page: string) => console.log('Navigate to:', page)} />
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: 'vacancies',
        element: <VacanciesPage onNavigate={(page: string) => console.log('Navigate to:', page)} />
      },
      {
        path: 'contact',
        element: <ContactPage onNavigate={(page: string) => console.log('Navigate to:', page)} />
      },
      {
        path: 'drivers',
        element: <DriversPage onNavigate={(page: string) => console.log('Navigate to:', page)} />
      },
      {
        path: 'clients',
        element: <ClientsPage onNavigate={(page: string) => console.log('Navigate to:', page)} />
      }
    ]
  }
]);

export default function App() {
  console.log('[APP] App component rendered');
  return <RouterProvider router={router} />;
}
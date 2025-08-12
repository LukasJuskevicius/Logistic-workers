// Main app with React Router loader/action pattern
import { createBrowserRouter, RouterProvider, Outlet, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

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
  const { user } = useLoaderData<{ user: any | null }>();


  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      
      <main className="pt-16">
        {navigation.state === 'loading' && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 animate-pulse z-50" />
        )}
        <Outlet context={{ user }} />
      </main>

      <Footer />
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
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />,
        action: loginAction,
        loader: () => {
          // If user is already logged in, redirect to home
          if (sessionStorage.getItem('user')) {
            return redirect('/');
          }
          return null;
        }
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: 'vacancies',
        element: <VacanciesPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'drivers',
        element: <DriversPage />
      },
      {
        path: 'clients',
        element: <ClientsPage />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
// 1. createBrowserRouter: Creates the main router configuration
// 2. RouterProvider: Provides the router to the app
// 3. Outlet: Placeholder for nested routes / renders child routes
// 4. useLoaderData: Access data from route loaders
// 5. useNavigate: Programmatic navigation
// 6. useNavigation: Access navigation state (loading, submitting, etc.)

import { createBrowserRouter, RouterProvider, Outlet, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

// Basic react hooks currently unused.
import { useState, useEffect } from 'react';

// Import pages
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VacanciesPage } from './pages/vacancies/VacanciesPage';
import { ContactPage } from './pages/contact/ContactPage';
import { DriversPage } from './pages/drivers';
import { ClientsPage } from './pages/clients/ClientsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';

// Import components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Import loaders and actions
import { authLoader } from './routes/loaders/authLoader';
import { loginAction } from './routes/actions/loginAction';
import { registerAction } from './routes/actions/registerAction';
import { AdminDashboard } from './components/admin/AdminDashboard';
import AdminDashboardDemo from './components/admin/AdminDashboardDemo';
import AdminProfile from './components/admin/AdminProfile';
import AdminSettings from './components/admin/AdminSettings';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminMessages from './components/admin/AdminMessages';
import AdminManageUsers from './components/admin/AdminManageUsers';

// Import API functions
import { logout } from './api/auth/logout';

// Root layout component
function RootLayout() {
  // Function to programically navigate
  const navigate = useNavigate();
  // Object with current navigation state
  const navigation = useNavigation();
  // React loader hook, returns data that was returned by authLoader
  const userData = useLoaderData();
  const user = userData.user;

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

// Create router with loaders and actions, define all routes and their components
const router = createBrowserRouter([
  {
    // Root layout uses '/' as root layout
    path: '/',
    element: <RootLayout />,
    // runs before any component renders
    // auth loader handles authentication
    loader: authLoader,
    HydrateFallback: () => <div>Loading...</div>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />,
        // TODO : 1) login page uses login action to handle form submission. Maybe loginActio logic should be inside login page
        action: loginAction,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
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
      },
      {
        path: 'admin/dashboard',
        element: <AdminDashboardDemo />
      },
      {
        path: 'admin/settings',
        element: <AdminSettings />
      },
      {
        path: 'admin/analytics',
        element: <AdminAnalytics />
      },
      {
        path: 'admin/messages',
        element: <AdminMessages />
      },
      {
        path: 'admin/users',
        element: <AdminManageUsers />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
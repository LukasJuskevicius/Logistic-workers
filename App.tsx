import { useState, useEffect } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { ClientsPage } from './components/ClientsPage';
import { DriversPage } from './components/DriversPage';
import { RegisterPage } from './components/RegisterPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { VacanciesPage } from './components/VacanciesPage';
import { AdminDashboard } from './components/AdminDashboard';
import { api } from './utils/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  // Load user session on app start
  useEffect(() => {
    const savedSession = localStorage.getItem('logistic_workers_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.user && session.session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error loading saved session:', error);
        localStorage.removeItem('logistic_workers_session');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = async () => {
    try {
      // Call logout endpoint
      const session = JSON.parse(localStorage.getItem('logistic_workers_session') || '{}');
      if (session.session?.access_token) {
        await api.signOut(session.session.access_token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local session regardless of API call success
      localStorage.removeItem('logistic_workers_session');
      setUser(null);
      setCurrentPage('home');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={setCurrentPage} user={user} />;
      case 'clients':
        return <ClientsPage />;
      case 'drivers':
        return <DriversPage />;
      case 'register':
        return <RegisterPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'vacancies':
        return <VacanciesPage user={user} onNavigate={setCurrentPage} />;
      case 'admin':
        // Only allow admin access for admin users
        if (user?.type !== 'admin') {
          setCurrentPage('home');
          return <Homepage onNavigate={setCurrentPage} user={user} />;
        }
        return <AdminDashboard onNavigate={setCurrentPage} user={user} />;
      default:
        return <Homepage onNavigate={setCurrentPage} user={user} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {currentPage !== 'admin' && currentPage !== 'login' && (
          <Header 
            currentPage={currentPage} 
            onNavigate={setCurrentPage} 
            user={user}
            onSignOut={handleSignOut}
          />
        )}
        <main>
          {renderPage()}
        </main>
        {currentPage !== 'admin' && currentPage !== 'login' && <Footer onNavigate={setCurrentPage} />}
      </div>
    </LanguageProvider>
  );
}
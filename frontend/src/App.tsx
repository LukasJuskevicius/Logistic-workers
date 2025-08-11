// Simple main app with routing
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

// Import API
import { auth } from './api/auth';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    navigate('/');
  };

  const handleSignOut = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state and redirect, even if API call fails
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} user={user} onSignOut={handleSignOut} />
      
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/login" element={<LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage onNavigate={handleNavigate} />} />
          <Route path="/vacancies" element={<VacanciesPage onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
          <Route path="/drivers" element={<DriversPage onNavigate={handleNavigate} />} />
          <Route path="/clients" element={<ClientsPage onNavigate={handleNavigate} />} />
        </Routes>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
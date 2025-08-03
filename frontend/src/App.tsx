import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Import pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VacanciesPage } from './pages/VacanciesPage';
import { ContactPage } from './pages/ContactPage';
import { DriversPage } from './pages/DriversPage';
import { ClientsPage } from './pages/ClientsPage';

// Import components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LanguageProvider } from './components/common/LanguageContext';

// Role-specific dashboards
import { DriverDashboard } from './components/features/dashboards/DriverDashboard';
import { ClientDashboard } from './components/features/dashboards/ClientDashboard';
import { AdminDashboard } from './components/features/dashboards/AdminDashboard';

// Main App wrapper with Router
export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  );
}

// App content component that uses navigation hooks
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useAuth();

  const handleLoginSuccess = (userData: any) => {
    // Navigate to appropriate dashboard based on user type
    if (userData.type === 'driver') {
      navigate('/driver-dashboard');
    } else if (userData.type === 'client') {
      navigate('/client-dashboard');
    } else if (userData.type === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/');
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'register':
        navigate('/register');
        break;
      case 'vacancies':
        navigate('/vacancies');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'drivers':
        navigate('/drivers');
        break;
      case 'clients':
        navigate('/clients');
        break;
      case 'driver-dashboard':
        navigate('/driver-dashboard');
        break;
      case 'client-dashboard':
        navigate('/client-dashboard');
        break;
      case 'admin-dashboard':
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Get current page from pathname for header highlighting
  const getCurrentPage = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'home';
      case '/login':
        return 'login';
      case '/register':
        return 'register';
      case '/vacancies':
        return 'vacancies';
      case '/contact':
        return 'contact';
      case '/drivers':
        return 'drivers';
      case '/clients':
        return 'clients';
      case '/driver-dashboard':
        return 'driver-dashboard';
      case '/client-dashboard':
        return 'client-dashboard';
      case '/admin-dashboard':
        return 'admin-dashboard';
      default:
        return 'home';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Show header on all pages */}
      <Header 
        currentPage={getCurrentPage()}
        onNavigate={handleNavigate}
        user={user}
        onSignOut={handleSignOut}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/login" element={<LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage onNavigate={handleNavigate} />} />
          <Route path="/vacancies" element={<VacanciesPage user={user} onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
          <Route path="/drivers" element={<DriversPage onNavigate={handleNavigate} />} />
          <Route path="/clients" element={<ClientsPage onNavigate={handleNavigate} />} />
          
          {/* Role-specific dashboards */}
          <Route 
            path="/driver-dashboard" 
            element={
              user && user.type === 'driver' ? 
                <DriverDashboard user={user} onNavigate={handleNavigate} /> :
                <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            } 
          />
          <Route 
            path="/client-dashboard" 
            element={
              user && user.type === 'client' ? 
                <ClientDashboard user={user} onNavigate={handleNavigate} /> :
                <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              user && user.type === 'admin' ? 
                <AdminDashboard user={user} onNavigate={handleNavigate} /> :
                <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            } 
          />
        </Routes>
      </main>

      {/* Show footer on all pages */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
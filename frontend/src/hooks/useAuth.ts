import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

interface User {
  id: string;
  email: string;
  type: 'admin' | 'driver' | 'client';
  profile?: any;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const savedSession = localStorage.getItem('logistic_workers_session');
      if (savedSession) {
        const session = JSON.parse(savedSession);
        if (session.user && session.session) {
          setAuthState({
            user: session.user,
            loading: false,
            error: null,
          });
          return;
        }
      }
    } catch (error) {
      console.error('Error loading session:', error);
      localStorage.removeItem('logistic_workers_session');
    }

    setAuthState({
      user: null,
      loading: false,
      error: null,
    });
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiClient.auth.login(email, password);
      
      if (response.success && response.data) {
        // Store session
        localStorage.setItem('logistic_workers_session', JSON.stringify({
          user: response.data.user,
          session: response.data.session
        }));
        
        setAuthState({
          user: response.data.user,
          loading: false,
          error: null,
        });
        
        return { success: true, user: response.data.user };
      } else {
        const error = response.error || 'Login failed';
        setAuthState(prev => ({ ...prev, loading: false, error }));
        return { success: false, error };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during login';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      await apiClient.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('logistic_workers_session');
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    }
  };

  const register = async (userData: any, userType: 'driver' | 'client') => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = userType === 'driver' 
        ? await apiClient.auth.registerDriver(userData)
        : await apiClient.auth.registerClient(userData);
      
      if (response.success) {
        setAuthState(prev => ({ ...prev, loading: false }));
        return { success: true, message: response.message };
      } else {
        const error = response.error || 'Registration failed';
        setAuthState(prev => ({ ...prev, loading: false, error }));
        return { success: false, error };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during registration';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    register,
    clearError,
    isAuthenticated: !!authState.user,
    isAdmin: authState.user?.type === 'admin',
    isDriver: authState.user?.type === 'driver',
    isClient: authState.user?.type === 'client',
  };
}
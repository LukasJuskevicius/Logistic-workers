import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Alert, AlertDescription } from '../../ui/alert';
import { apiClient } from '../../../services/apiClient';

interface LoginFormProps {
  onLoginSuccess: (user: any) => void;
  onNavigate: (page: string) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.auth.login(email, password);
      
      if (response.success && response.data) {
        // Store session
        localStorage.setItem('logistic_workers_session', JSON.stringify({
          user: response.data.user,
          session: response.data.session
        }));
        
        onLoginSuccess(response.data.user);
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Demo accounts for testing:
        </p>
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <div>Admin: lukasjusekvicius18@gmail.com</div>
          <div>Driver: 92plmqaz@gmail.com</div>
          <div>Client: paul.my25@gmail.com</div>
          <div>Password: Karatistas123*</div>
        </div>
      </div>
    </form>
  );
}
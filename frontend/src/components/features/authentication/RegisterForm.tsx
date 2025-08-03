import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Alert, AlertDescription } from '../../ui/alert';
import { useAuth } from '../../../hooks/useAuth';

interface RegisterFormProps {
  onNavigate: (page: string) => void;
}

export function RegisterForm({ onNavigate }: RegisterFormProps) {
  const [userType, setUserType] = useState<'driver' | 'client'>('driver');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    // Driver fields
    fullName: '',
    phone: '',
    nationality: '',
    // Client fields
    companyName: '',
    contactName: '',
    registrationNumber: '',
    address: ''
  });
  
  const { register, loading, error, clearError } = useAuth();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.password.length < 8) {
      return;
    }

    // Prepare data based on user type
    let userData: any = {
      email: formData.email,
      password: formData.password,
    };

    if (userType === 'driver') {
      userData = {
        ...userData,
        fullName: formData.fullName,
        phone: formData.phone,
        nationality: formData.nationality,
      };
    } else {
      userData = {
        ...userData,
        companyName: formData.companyName,
        contactName: formData.contactName,
        phone: formData.phone,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
      };
    }

    const result = await register(userData, userType);
    
    if (result.success) {
      setSuccess(result.message || 'Registration successful! Please check your email.');
      setTimeout(() => {
        onNavigate('login');
      }, 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* User Type Selection */}
      <div>
        <Label htmlFor="userType">I am a</Label>
        <Select value={userType} onValueChange={(value: 'driver' | 'client') => setUserType(value)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="client">Employer/Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Common Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters</p>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Driver-specific fields */}
      {userType === 'driver' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              type="text"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className="mt-1"
              placeholder="e.g., Lithuanian, Ukrainian"
            />
          </div>
        </div>
      )}

      {/* Client-specific fields */}
      {userType === 'client' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactName">Contact Person Name</Label>
            <Input
              id="contactName"
              name="contactName"
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="registrationNumber">Company Registration Number</Label>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              value={formData.registrationNumber}
              onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
              className="mt-1"
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="address">Company Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1"
              placeholder="Optional"
            />
          </div>
        </div>
      )}

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading || formData.password !== formData.confirmPassword || formData.password.length < 8}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}
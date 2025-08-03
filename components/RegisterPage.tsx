import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from './LanguageContext';

export function RegisterPage() {
  const { t } = useLanguage();
  const [clientData, setClientData] = useState({
    companyName: '',
    registrationNumber: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [driverData, setDriverData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientData.password !== clientData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!clientData.agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    setIsSubmitting(true);
    try {
      const { api } = await import('../utils/api');
      const response = await api.registerClient(clientData);
      alert(response.message || 'Registration submitted! You will receive an email once your account is verified.');
      
      // Reset form
      setClientData({
        companyName: '',
        registrationNumber: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    } catch (error) {
      console.error('Client registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDriverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (driverData.password !== driverData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!driverData.agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    setIsSubmitting(true);
    try {
      const { api } = await import('../utils/api');
      const response = await api.registerDriver(driverData);
      alert(response.message || 'Registration submitted! You will receive an email once your account is verified.');
      
      // Reset form
      setDriverData({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    } catch (error) {
      console.error('Driver registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClientChange = (field: string, value: string | boolean) => {
    setClientData(prev => ({ ...prev, [field]: value }));
  };

  const handleDriverChange = (field: string, value: string | boolean) => {
    setDriverData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('register.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Join our platform and access exclusive opportunities
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Choose your account type and fill in the required information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">{t('register.client.tab')}</TabsTrigger>
                <TabsTrigger value="driver">{t('register.driver.tab')}</TabsTrigger>
              </TabsList>

              {/* Client Registration */}
              <TabsContent value="client">
                <form onSubmit={handleClientSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="client-company">{t('clients.form.company')}</Label>
                      <Input
                        id="client-company"
                        value={clientData.companyName}
                        onChange={(e) => handleClientChange('companyName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-reg">{t('register.company.reg')}</Label>
                      <Input
                        id="client-reg"
                        value={clientData.registrationNumber}
                        onChange={(e) => handleClientChange('registrationNumber', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-contact">{t('clients.form.contact.name')}</Label>
                    <Input
                      id="client-contact"
                      value={clientData.contactName}
                      onChange={(e) => handleClientChange('contactName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="client-email">{t('clients.form.email')}</Label>
                      <Input
                        id="client-email"
                        type="email"
                        value={clientData.email}
                        onChange={(e) => handleClientChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-phone">{t('clients.form.phone')}</Label>
                      <Input
                        id="client-phone"
                        type="tel"
                        value={clientData.phone}
                        onChange={(e) => handleClientChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-address">Company Address</Label>
                    <Input
                      id="client-address"
                      value={clientData.address}
                      onChange={(e) => handleClientChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="client-password">{t('register.password')}</Label>
                      <Input
                        id="client-password"
                        type="password"
                        value={clientData.password}
                        onChange={(e) => handleClientChange('password', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-confirm">{t('register.confirm.password')}</Label>
                      <Input
                        id="client-confirm"
                        type="password"
                        value={clientData.confirmPassword}
                        onChange={(e) => handleClientChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="client-terms"
                      checked={clientData.agreeTerms}
                      onCheckedChange={(checked) => handleClientChange('agreeTerms', checked)}
                    />
                    <Label htmlFor="client-terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> {t('register.verification.note')}
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : t('register.submit')}
                  </Button>
                </form>
              </TabsContent>

              {/* Driver Registration */}
              <TabsContent value="driver">
                <form onSubmit={handleDriverSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="driver-name">{t('drivers.form.name')}</Label>
                    <Input
                      id="driver-name"
                      value={driverData.fullName}
                      onChange={(e) => handleDriverChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="driver-email">Email Address</Label>
                      <Input
                        id="driver-email"
                        type="email"
                        value={driverData.email}
                        onChange={(e) => handleDriverChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="driver-phone">Phone Number</Label>
                      <Input
                        id="driver-phone"
                        type="tel"
                        value={driverData.phone}
                        onChange={(e) => handleDriverChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="driver-nationality">{t('drivers.form.nationality')}</Label>
                    <Input
                      id="driver-nationality"
                      value={driverData.nationality}
                      onChange={(e) => handleDriverChange('nationality', e.target.value)}
                      placeholder="e.g., Lithuanian, Ukrainian, Polish"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="driver-password">{t('register.password')}</Label>
                      <Input
                        id="driver-password"
                        type="password"
                        value={driverData.password}
                        onChange={(e) => handleDriverChange('password', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="driver-confirm">{t('register.confirm.password')}</Label>
                      <Input
                        id="driver-confirm"
                        type="password"
                        value={driverData.confirmPassword}
                        onChange={(e) => handleDriverChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="driver-terms"
                      checked={driverData.agreeTerms}
                      onCheckedChange={(checked) => handleDriverChange('agreeTerms', checked)}
                    />
                    <Label htmlFor="driver-terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <p className="text-sm text-green-800">
                      <strong>Next Step:</strong> After registration, complete your detailed driver profile to access job opportunities.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> {t('register.verification.note')}
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : t('register.submit')}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
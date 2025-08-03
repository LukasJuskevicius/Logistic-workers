import { useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Users, Clock, Shield, CheckCircle, Truck, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { api } from '../utils/api';

export function ClientsPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    workType: '',
    licenseRequired: '',
    hoursPerWeek: '',
    driversNeeded: '',
    notes: '',
    startDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await api.submitJobRequest(formData);
      setMessage({ 
        type: 'success', 
        text: 'Thank you for your job request! We will contact you soon with matching drivers.' 
      });
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        location: '',
        workType: '',
        licenseRequired: '',
        hoursPerWeek: '',
        driversNeeded: '',
        notes: '',
        startDate: ''
      });
    } catch (error: any) {
      console.error('Job request error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to submit job request' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const services = [
    {
      icon: Users,
      title: 'Pre-vetted Drivers',
      description: 'All our drivers are thoroughly screened and have verified licenses and experience'
    },
    {
      icon: Clock,
      title: 'Fast Recruitment',
      description: 'Get qualified drivers within 1-2 weeks of submitting your requirements'
    },
    {
      icon: Shield,
      title: 'Reliable Support',
      description: 'Ongoing support throughout the recruitment process and employment period'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guarantee',
      description: 'We ensure all drivers meet your specific requirements and industry standards'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {t('clients.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              {t('clients.hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <Truck className="h-6 w-6 mr-2" />
                <span>500+ Qualified Drivers</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                <span>EU-wide Coverage</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('clients.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive recruitment solutions tailored to your logistics needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('clients.form.title')}
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your requirements and we'll find the perfect drivers for your business
            </p>
          </div>

          {message && (
            <Alert className={`mb-6 max-w-4xl mx-auto ${message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Job Request Form</CardTitle>
              <CardDescription>
                Please provide detailed information about your driver requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">{t('clients.form.company')}</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">{t('clients.form.contact.name')}</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">{t('clients.form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('clients.form.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">{t('clients.form.location')}</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Region"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="workType">{t('clients.form.work.type')}</Label>
                    <Select value={formData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food-distribution">Food Distribution</SelectItem>
                        <SelectItem value="frigo">Frigo Transport</SelectItem>
                        <SelectItem value="container">Container Transport</SelectItem>
                        <SelectItem value="general-cargo">General Cargo</SelectItem>
                        <SelectItem value="construction">Construction Materials</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="licenseRequired">{t('clients.form.license')}</Label>
                    <Select value={formData.licenseRequired} onValueChange={(value) => handleInputChange('licenseRequired', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="License type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C">C License</SelectItem>
                        <SelectItem value="CE">CE License</SelectItem>
                        <SelectItem value="C/CE">C or CE License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hoursPerWeek">{t('clients.form.hours')}</Label>
                    <Select value={formData.hoursPerWeek} onValueChange={(value) => handleInputChange('hoursPerWeek', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hours/week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="40">40 hours</SelectItem>
                        <SelectItem value="50-60">50-60 hours</SelectItem>
                        <SelectItem value="60+">60+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="driversNeeded">{t('clients.form.drivers.needed')}</Label>
                    <Input
                      id="driversNeeded"
                      type="number"
                      value={formData.driversNeeded}
                      onChange={(e) => handleInputChange('driversNeeded', e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="startDate">{t('clients.form.start.date')}</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">{t('clients.form.notes')}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Language requirements, specific experience, schedule preferences, etc."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={loading}>
                  {loading ? 'Submitting...' : t('clients.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
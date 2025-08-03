import { useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Award, DollarSign, Shield, Users, Upload, Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { api } from '../utils/api';

export function DriversPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseCategories: [],
    experience: '',
    languages: {
      english: '',
      dutch: '',
      lithuanian: '',
      ukrainian: ''
    },
    preferredRoutes: '',
    availability: '',
    workPreferred: '',
    previousExperience: '',
    certifications: '',
    preferredHours: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await api.submitDriverApplication(formData);
      setMessage({ 
        type: 'success', 
        text: 'Thank you for your application! We will review it and contact you within 24-48 hours.' 
      });
      // Reset form
      setFormData({
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        address: '',
        email: '',
        phone: '',
        licenseNumber: '',
        licenseCategories: [],
        experience: '',
        languages: {
          english: '',
          dutch: '',
          lithuanian: '',
          ukrainian: ''
        },
        preferredRoutes: '',
        availability: '',
        workPreferred: '',
        previousExperience: '',
        certifications: '',
        preferredHours: ''
      });
    } catch (error: any) {
      console.error('Driver application error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to submit application' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (language: string, level: string) => {
    setFormData(prev => ({
      ...prev,
      languages: { ...prev.languages, [language]: level }
    }));
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Wages',
      description: 'Fair compensation with transparent payment terms'
    },
    {
      icon: Shield,
      title: 'Job Security',
      description: 'Long-term contracts with reliable European companies'
    },
    {
      icon: Users,
      title: 'Professional Support',
      description: 'Dedicated support team to help with all your needs'
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Opportunities for skill development and advancement'
    }
  ];

  const testimonials = [
    {
      name: "Marius K.",
      nationality: "Lithuanian",
      route: "Netherlands - Germany",
      rating: 5,
      text: "Working with Logistic Workers has been fantastic. They helped me find a stable job with good pay and excellent working conditions. The support team is always available when I need help.",
      experience: "2 years with company"
    },
    {
      name: "Oleksandr P.",
      nationality: "Ukrainian",
      route: "Lithuania - Netherlands",
      rating: 5,
      text: "Great company! They helped me not just with finding work, but also with housing and paperwork. Very professional and supportive. I recommend to all my fellow drivers.",
      experience: "18 months with company"
    },
    {
      name: "Vytautas R.",
      nationality: "Lithuanian",
      route: "Netherlands Routes",
      rating: 5,
      text: "Found my current job through Logistic Workers. Fair wages, good trucks, and respectful treatment. They really care about drivers' welfare and working conditions.",
      experience: "3 years with company"
    }
  ];

  const languageLevels = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'native', label: 'Native' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {t('drivers.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 max-w-4xl mx-auto">
              {t('drivers.hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-8 text-green-100">
              <div className="text-center">
                <div className="text-3xl font-bold">2000+</div>
                <div>Happy Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">€2500+</div>
                <div>Average Monthly Income</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div>Driver Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('drivers.benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network and enjoy the benefits of working with professional logistics companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('drivers.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from drivers who found success through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.nationality}</CardDescription>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Route:</strong> {testimonial.route}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Experience:</strong> {testimonial.experience}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('drivers.form.title')}
            </h2>
            <p className="text-xl text-gray-600">
              Complete your application and take the first step towards your new career
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
              <CardTitle>Driver Application Form</CardTitle>
              <CardDescription>
                Please provide accurate information. All applications are reviewed within 24-48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">{t('drivers.form.name')}</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">{t('drivers.form.dob')}</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label htmlFor="nationality">{t('drivers.form.nationality')}</Label>
                      <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lithuanian">Lithuanian</SelectItem>
                          <SelectItem value="ukrainian">Ukrainian</SelectItem>
                          <SelectItem value="polish">Polish</SelectItem>
                          <SelectItem value="other">Other EU</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">{t('drivers.form.address')}</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* License Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">License Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="licenseNumber">{t('drivers.form.license.number')}</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">{t('drivers.form.experience')}</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Language Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('drivers.form.languages')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>English</Label>
                      <Select value={formData.languages.english} onValueChange={(value) => handleLanguageChange('english', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Dutch</Label>
                      <Select value={formData.languages.dutch} onValueChange={(value) => handleLanguageChange('dutch', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Work Preferences */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Work Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferredRoutes">{t('drivers.form.routes')}</Label>
                      <Input
                        id="preferredRoutes"
                        value={formData.preferredRoutes}
                        onChange={(e) => handleInputChange('preferredRoutes', e.target.value)}
                        placeholder="Netherlands, Germany, Belgium, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="workPreferred">{t('drivers.form.work.preferred')}</Label>
                      <Select value={formData.workPreferred} onValueChange={(value) => handleInputChange('workPreferred', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food-distribution">Food Distribution</SelectItem>
                          <SelectItem value="frigo">Frigo Transport</SelectItem>
                          <SelectItem value="container">Container Transport</SelectItem>
                          <SelectItem value="general-cargo">General Cargo</SelectItem>
                          <SelectItem value="construction">Construction Materials</SelectItem>
                          <SelectItem value="no-preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="previousExperience">{t('drivers.form.previous')}</Label>
                  <Textarea
                    id="previousExperience"
                    value={formData.previousExperience}
                    onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                    placeholder="Describe your previous driving experience, companies worked for, types of cargo handled, etc."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="certifications">{t('drivers.form.certifications')}</Label>
                  <Input
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    placeholder="ADR, Forklift license, etc."
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please upload the following documents (PDF, DOC, JPG, PNG - max 5MB per file):
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">CV/Resume</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Driving License</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={loading}>
                  {loading ? 'Submitting Application...' : t('drivers.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
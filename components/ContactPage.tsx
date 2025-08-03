import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { api } = await import('../utils/api');
      const response = await api.submitContactForm(formData);
      alert(response.message || 'Thank you for your message! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      alert(`Message submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: t('footer.address'),
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: `${t('footer.phone')} (Paulius)`,
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: t('footer.email'),
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM (EET)',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {t('contact.title')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Have questions? We're here to help. Contact us for any inquiries about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gray-100 ${info.color}`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          <p className="text-gray-600">{info.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Legal Name</h4>
                      <p className="text-gray-600">{t('footer.company')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Brand Name</h4>
                      <p className="text-gray-600">{t('footer.brand')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Services</h4>
                      <p className="text-gray-600">Lorry driver recruitment and placement services across Europe</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Follow Us</h4>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Facebook className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Linkedin className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.form.title')}</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
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

                    <div>
                      <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What is this about?"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Message...' : t('contact.form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Vilnius, Lithuania</h3>
                      <p className="text-sm">{t('footer.address')}</p>
                      <p className="text-sm mt-2 text-blue-600">
                        <a href="#" className="hover:underline">View on Google Maps</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
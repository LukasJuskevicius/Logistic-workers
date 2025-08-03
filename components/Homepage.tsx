import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Truck, Users, Award, Shield, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomepageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

export function Homepage({ onNavigate, user }: HomepageProps) {
  const { t, language } = useLanguage();

  // Personalized translations for logged-in users
  const personalizedTranslations = {
    en: {
      welcomeBack: 'Welcome back, {name}!',
      driverDashboardSubtitle: 'Ready to find your next driving opportunity? Check out available positions and manage your applications.',
      clientDashboardSubtitle: 'Manage your job requests and find qualified drivers for your transport needs.',
      adminDashboardSubtitle: 'Oversee platform operations, manage user registrations, and review applications.',
      viewJobs: 'View Available Jobs',
      updateApplication: 'Update My Application',
      postJobRequest: 'Post New Job Request',
      browseDrivers: 'Browse Drivers',
      adminDashboard: 'Admin Dashboard',
      viewMessages: 'View Messages',
      myApplicationStatus: 'My Application Status',
      myJobRequests: 'My Job Requests',
      pendingApproval: 'Account Pending Approval',
      accountApproved: 'Account Approved - Welcome!',
      quickActions: 'Quick Actions'
    },
    lt: {
      welcomeBack: 'Sveiki sugrįžę, {name}!',
      driverDashboardSubtitle: 'Pasiruošę rasti kitą vairavimo galimybę? Peržiūrėkite laisvas pozicijas ir tvarkykite prašymus.',
      clientDashboardSubtitle: 'Tvarkykite darbo užklausas ir raskite kvalifikuotus vairuotojus savo transporto poreikiams.',
      adminDashboardSubtitle: 'Prižiūrėkite platformos veiklą, tvarkykite vartotojų registracijas ir peržiūrėkite prašymus.',
      viewJobs: 'Žiūrėti laisvus darbus',
      updateApplication: 'Atnaujinti prašymą',
      postJobRequest: 'Paskelbti darbo užklausą',
      browseDrivers: 'Naršyti vairuotojus',
      adminDashboard: 'Administratoriaus skydelis',
      viewMessages: 'Žiūrėti žinutes',
      myApplicationStatus: 'Mano prašymo statusas',
      myJobRequests: 'Mano darbo užklausos',
      pendingApproval: 'Paskyra laukia patvirtinimo',
      accountApproved: 'Paskyra patvirtinta - Sveiki!',
      quickActions: 'Greiti veiksmai'
    },
    nl: {
      welcomeBack: 'Welkom terug, {name}!',
      driverDashboardSubtitle: 'Klaar om je volgende rijkans te vinden? Bekijk beschikbare posities en beheer je aanvragen.',
      clientDashboardSubtitle: 'Beheer je vacatureverzoeken en vind gekwalificeerde chauffeurs voor je transportbehoeften.',
      adminDashboardSubtitle: 'Beheers platformactiviteiten, beheer gebruikersregistraties en beoordeel aanvragen.',
      viewJobs: 'Beschikbare Banen Bekijken',
      updateApplication: 'Mijn Aanvraag Bijwerken',
      postJobRequest: 'Nieuwe Vacature Plaatsen',
      browseDrivers: 'Chauffeurs Bekijken',
      adminDashboard: 'Admin Dashboard',
      viewMessages: 'Berichten Bekijken',
      myApplicationStatus: 'Mijn Aanvraagstatus',
      myJobRequests: 'Mijn Vacatureverzoeken',
      pendingApproval: 'Account Wacht op Goedkeuring',
      accountApproved: 'Account Goedgekeurd - Welkom!',
      quickActions: 'Snelle Acties'
    },
    uk: {
      welcomeBack: 'Ласкаво просимо назад, {name}!',
      driverDashboardSubtitle: 'Готові знайти свою наступну можливість водіння? Перегляньте доступні позиції та керуйте заявками.',
      clientDashboardSubtitle: 'Керуйте запитами на роботу та знаходьте кваліфікованих водіїв для ваших транспортних потреб.',
      adminDashboardSubtitle: 'Контролюйте діяльність платформи, керуйте реєстраціями користувачів та переглядайте заявки.',
      viewJobs: 'Переглянути Доступні Роботи',
      updateApplication: 'Оновити Мою Заявку',
      postJobRequest: 'Розмістити Новий Запит',
      browseDrivers: 'Переглянути Водіїв',
      adminDashboard: 'Панель Адміністратора',
      viewMessages: 'Переглянути Повідомлення',
      myApplicationStatus: 'Статус Моєї Заявки',
      myJobRequests: 'Мої Запити на Роботу',
      pendingApproval: 'Акаунт Очікує Підтвердження',
      accountApproved: 'Акаунт Підтверджено - Ласкаво Просимо!',
      quickActions: 'Швидкі Дії'
    }
  };

  const personalizedText = personalizedTranslations[language] || personalizedTranslations.en;

  const driverBenefits = [
    {
      icon: Award,
      title: t('why.drivers.growth'),
      description: 'Opportunities for professional development and career advancement'
    },
    {
      icon: Shield,
      title: t('why.drivers.stable'),
      description: 'Long-term employment with reliable European companies'
    },
    {
      icon: Users,
      title: t('why.drivers.support'),
      description: 'Comprehensive support for international drivers'
    },
    {
      icon: CheckCircle,
      title: t('why.drivers.fair'),
      description: 'Competitive wages and fair working conditions'
    }
  ];

  const clientBenefits = [
    {
      icon: Users,
      title: t('why.clients.reliable'),
      description: 'Access to pre-vetted, experienced drivers'
    },
    {
      icon: Globe,
      title: t('why.clients.tailored'),
      description: 'Customized recruitment solutions for your needs'
    },
    {
      icon: Truck,
      title: t('why.clients.streamlined'),
      description: 'Fast and efficient hiring process'
    },
    {
      icon: CheckCircle,
      title: t('why.clients.efficient'),
      description: 'Cost-effective recruitment services'
    }
  ];

  const testimonials = [
    {
      name: "Marius K.",
      route: "Netherlands - Germany",
      text: "Working with Logistic Workers changed my career. Professional support and great opportunities!"
    },
    {
      name: "Oleksandr P.",
      route: "Lithuania - Netherlands",
      text: "Found stable work quickly. The team helped me with everything from documents to housing."
    },
    {
      name: "Vytautas R.",
      route: "Netherlands Routes",
      text: "Fair wages, good working conditions, and reliable company. Highly recommend!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {user ? (
              /* Personalized Hero for Logged-in Users */
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                  {personalizedText.welcomeBack.replace('{name}', 
                    user.profile?.name || 
                    user.profile?.full_name || 
                    user.profile?.contact_name || 
                    'User'
                  )}
                </h1>
                
                {/* User Status Alert */}
                {user.profile?.status === 'pending_verification' && (
                  <div className="mb-6 mx-auto max-w-md">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
                      <strong>{personalizedText.pendingApproval}</strong>
                      <p className="text-sm mt-1">We'll notify you once your account is approved.</p>
                    </div>
                  </div>
                )}
                
                {user.profile?.status === 'verified' && (
                  <div className="mb-6 mx-auto max-w-md">
                    <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg">
                      <strong>{personalizedText.accountApproved}</strong>
                    </div>
                  </div>
                )}

                {user.type === 'driver' && (
                  <div>
                    <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                      {personalizedText.driverDashboardSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                        onClick={() => onNavigate('vacancies')}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        {personalizedText.viewJobs}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
                        onClick={() => onNavigate('drivers')}
                      >
                        <Truck className="mr-2 h-5 w-5" />
                        {personalizedText.updateApplication}
                      </Button>
                    </div>
                  </div>
                )}

                {user.type === 'client' && (
                  <div>
                    <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                      {personalizedText.clientDashboardSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                        onClick={() => onNavigate('clients')}
                      >
                        <Truck className="mr-2 h-5 w-5" />
                        {personalizedText.postJobRequest}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
                        onClick={() => onNavigate('drivers')}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        {personalizedText.browseDrivers}
                      </Button>
                    </div>
                  </div>
                )}

                {user.type === 'admin' && (
                  <div>
                    <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                      {personalizedText.adminDashboardSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                        onClick={() => onNavigate('admin')}
                      >
                        <Shield className="mr-2 h-5 w-5" />
                        {personalizedText.adminDashboard}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
                        onClick={() => onNavigate('contact')}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        {personalizedText.viewMessages}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Default Hero for Guest Users */
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                  {t('hero.title')}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                    onClick={() => onNavigate('drivers')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    {t('hero.btn.driver')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
                    onClick={() => onNavigate('clients')}
                  >
                    <Truck className="mr-2 h-5 w-5" />
                    {t('hero.btn.client')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </section>

      {/* Personalized Dashboard Section for Logged-in Users */}
      {user && (
        <section className="py-16 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {personalizedText.quickActions}
              </h2>
            </div>

            {user.type === 'driver' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{personalizedText.myApplicationStatus}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      user.profile?.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.profile?.status === 'verified' ? 'Approved' : 'Pending Review'}
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => onNavigate('drivers')}
                    >
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
                    <CardTitle>Available Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent mb-2">12</div>
                    <p className="text-gray-600 text-sm mb-4">New positions this week</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('vacancies')}
                    >
                      Browse Jobs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle>Profile Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {user.profile?.profile_complete ? '100%' : '85%'}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {user.profile?.profile_complete ? 'Complete' : 'Almost there'}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => onNavigate('drivers')}
                    >
                      {user.profile?.profile_complete ? 'View Profile' : 'Complete Profile'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {user.type === 'client' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{personalizedText.myJobRequests}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">3</div>
                    <p className="text-gray-600 text-sm mb-4">Active job postings</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('clients')}
                    >
                      Manage Requests
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                    <CardTitle>Driver Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent mb-2">8</div>
                    <p className="text-gray-600 text-sm mb-4">New applications this week</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('drivers')}
                    >
                      Review Applications
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle>Company Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      user.profile?.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.profile?.status === 'verified' ? 'Verified' : 'Pending'}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => onNavigate('clients')}
                    >
                      Update Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {user.type === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Pending Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">5</div>
                    <p className="text-gray-600 text-sm mb-4">Awaiting approval</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('admin')}
                    >
                      Review
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
                    <CardTitle>Driver Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent mb-2">12</div>
                    <p className="text-gray-600 text-sm mb-4">New this week</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('admin')}
                    >
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle>Job Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                    <p className="text-gray-600 text-sm mb-4">Active postings</p>
                    <Button 
                      className="w-full" 
                      onClick={() => onNavigate('admin')}
                    >
                      View All
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                    <p className="text-gray-600 text-sm mb-4">Unread messages</p>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => onNavigate('contact')}
                    >
                      Read
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('why.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect talented drivers with reliable employers across Europe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* For Drivers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('why.drivers.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {driverBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => onNavigate('drivers')}
                >
                  Apply as Driver
                </Button>
              </div>
            </div>

            {/* For Clients */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('why.clients.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clientBenefits.map((benefit, index) => (
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
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => onNavigate('clients')}
                >
                  Post Job Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Drivers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from drivers who found their opportunities through Logistic Workers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.route}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of drivers and companies who trust Logistic Workers for their recruitment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3 text-lg"
              onClick={() => onNavigate('register')}
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
              onClick={() => onNavigate('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
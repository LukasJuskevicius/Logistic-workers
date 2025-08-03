import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Clock, Truck, Users, Filter, Star, Euro } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VacanciesPageProps {
  user?: any;
  onNavigate: (page: string) => void;
}

export function VacanciesPage({ user, onNavigate }: VacanciesPageProps) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const translations = {
    en: {
      title: 'Available Positions',
      subtitle: 'Find your next driving opportunity in the Netherlands',
      searchPlaceholder: 'Search jobs...',
      filters: 'Filters',
      location: 'Location',
      licenseType: 'License Required',
      jobType: 'Job Type',
      allLocations: 'All Locations',
      allLicenses: 'All Licenses',
      allTypes: 'All Types',
      clearFilters: 'Clear Filters',
      noResults: 'No jobs found matching your criteria',
      noResultsDesc: 'Try adjusting your filters or search terms',
      hoursPerWeek: 'hours/week',
      driversNeeded: 'drivers needed',
      viewDetails: 'View Details',
      applyNow: 'Apply Now',
      requiresLogin: 'Login Required',
      loginToApply: 'Please login to apply for this position',
      premium: 'Premium',
      featured: 'Featured',
      urgent: 'Urgent',
      newJob: 'New',
      salaryRange: 'Salary Range',
      experience: 'Experience',
      benefits: 'Benefits',
      requirements: 'Requirements',
      company: 'Company',
      postedDate: 'Posted',
      daysAgo: 'days ago'
    },
    lt: {
      title: 'Laisvos pozicijos',
      subtitle: 'Raskite savo kitą vairavimo galimybę Nyderlanduose',
      searchPlaceholder: 'Ieškoti darbų...',
      filters: 'Filtrai',
      location: 'Vieta',
      licenseType: 'Reikalingas pažymėjimas',
      jobType: 'Darbo tipas',
      allLocations: 'Visos vietos',
      allLicenses: 'Visi pažymėjimai',
      allTypes: 'Visi tipai',
      clearFilters: 'Išvalyti filtrus',
      noResults: 'Nerasta darbų pagal jūsų kriterijus',
      noResultsDesc: 'Pabandykite keisti filtrus ar paieškos žodžius',
      hoursPerWeek: 'val./savaitė',
      driversNeeded: 'reikia vairuotojų',
      viewDetails: 'Žiūrėti detales',
      applyNow: 'Kreiptis dabar',
      requiresLogin: 'Reikia prisijungti',
      loginToApply: 'Prisijunkite, kad galėtumėte kreiptis',
      premium: 'Premium',
      featured: 'Rekomenduojama',
      urgent: 'Skubu',
      newJob: 'Naujas',
      salaryRange: 'Atlyginimo diapazonas',
      experience: 'Patirtis',
      benefits: 'Privalumai',
      requirements: 'Reikalavimai',
      company: 'Įmonė',
      postedDate: 'Paskelbta',
      daysAgo: 'dienos prieš'
    },
    nl: {
      title: 'Beschikbare Posities',
      subtitle: 'Vind je volgende rijkans in Nederland',
      searchPlaceholder: 'Zoek banen...',
      filters: 'Filters',
      location: 'Locatie',
      licenseType: 'Rijbewijs Vereist',
      jobType: 'Baantype',
      allLocations: 'Alle Locaties',
      allLicenses: 'Alle Rijbewijzen',
      allTypes: 'Alle Types',
      clearFilters: 'Filters Wissen',
      noResults: 'Geen banen gevonden die voldoen aan uw criteria',
      noResultsDesc: 'Probeer uw filters of zoektermen aan te passen',
      hoursPerWeek: 'uur/week',
      driversNeeded: 'chauffeurs nodig',
      viewDetails: 'Bekijk Details',
      applyNow: 'Nu Solliciteren',
      requiresLogin: 'Inloggen Vereist',
      loginToApply: 'Log in om te solliciteren op deze functie',
      premium: 'Premium',
      featured: 'Uitgelicht',
      urgent: 'Urgent',
      newJob: 'Nieuw',
      salaryRange: 'Salarisverwachting',
      experience: 'Ervaring',
      benefits: 'Voordelen',
      requirements: 'Vereisten',
      company: 'Bedrijf',
      postedDate: 'Geplaatst',
      daysAgo: 'dagen geleden'
    },
    uk: {
      title: 'Доступні позиції',
      subtitle: 'Знайдіть свою наступну можливість водіння в Нідерландах',
      searchPlaceholder: 'Шукати роботу...',
      filters: 'Фільтри',
      location: 'Місцезнаходження',
      licenseType: 'Потрібні права',
      jobType: 'Тип роботи',
      allLocations: 'Всі місця',
      allLicenses: 'Всі права',
      allTypes: 'Всі типи',
      clearFilters: 'Очистити фільтри',
      noResults: 'Не знайдено роботи за вашими критеріями',
      noResultsDesc: 'Спробуйте змінити фільтри або пошукові терміни',
      hoursPerWeek: 'год/тиждень',
      driversNeeded: 'потрібно водіїв',
      viewDetails: 'Переглянути деталі',
      applyNow: 'Подати заявку',
      requiresLogin: 'Потрібен вхід',
      loginToApply: 'Увійдіть, щоб подати заявку на цю посаду',
      premium: 'Преміум',
      featured: 'Рекомендовано',
      urgent: 'Терміново',
      newJob: 'Нове',
      salaryRange: 'Діапазон зарплати',
      experience: 'Досвід',
      benefits: 'Переваги',
      requirements: 'Вимоги',
      company: 'Компанія',
      postedDate: 'Опубліковано',
      daysAgo: 'днів тому'
    }
  };

  const text = translations[language] || translations.en;

  // Sample job vacancies data
  const jobVacancies = [
    {
      id: 'job-001',
      title: 'CE Driver - Fresh Food Distribution',
      company: 'Fresh Transport NL',
      location: 'Amsterdam',
      licenseRequired: 'CE',
      hoursPerWeek: '45-50',
      driversNeeded: 3,
      salaryRange: '€2,800 - €3,200',
      experience: '2+ years',
      type: 'Fresh Transport',
      description: 'We are looking for experienced CE drivers for fresh food distribution across Netherlands.',
      requirements: ['Valid CE license', 'Clean driving record', 'Basic English', 'Flexibility with schedules'],
      benefits: ['Company truck', 'Fuel allowance', 'Health insurance', 'Overtime pay'],
      urgent: true,
      featured: false,
      premium: false,
      postedDays: 2,
      image: 'https://images.unsplash.com/photo-1550845503-52d7b7f3cda8?w=400&h=200&fit=crop'
    },
    {
      id: 'job-002',
      title: 'C+E Driver - International Transport',
      company: 'EuroLink Logistics',
      location: 'Rotterdam',
      licenseRequired: 'CE',
      hoursPerWeek: '55-60',
      driversNeeded: 5,
      salaryRange: '€3,200 - €3,800',
      experience: '3+ years',
      type: 'International',
      description: 'International transport routes across Europe. Experience with customs procedures preferred.',
      requirements: ['Valid CE license', 'International experience', 'Good English/German', 'EU work permit'],
      benefits: ['Modern trucks', 'Travel allowances', 'Performance bonuses', 'Pension plan'],
      urgent: false,
      featured: true,
      premium: true,
      postedDays: 1,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop'
    },
    {
      id: 'job-003',
      title: 'C Driver - Local Delivery',
      company: 'City Express',
      location: 'Utrecht',
      licenseRequired: 'C',
      hoursPerWeek: '40-45',
      driversNeeded: 2,
      salaryRange: '€2,400 - €2,800',
      experience: '1+ years',
      type: 'Local Delivery',
      description: 'Local delivery routes within Utrecht area. Day shifts only, home every evening.',
      requirements: ['Valid C license', 'Local area knowledge', 'Customer service skills', 'Physical fitness'],
      benefits: ['Day shifts only', 'Home daily', 'Company uniform', 'Training provided'],
      urgent: false,
      featured: false,
      premium: false,
      postedDays: 5,
      image: 'https://images.unsplash.com/photo-1541560052-77288d47fcd4?w=400&h=200&fit=crop'
    },
    {
      id: 'job-004',
      title: 'CE Driver - Container Transport',
      company: 'Container Masters',
      location: 'Rotterdam',
      licenseRequired: 'CE',
      hoursPerWeek: '50-55',
      driversNeeded: 4,
      salaryRange: '€3,000 - €3,600',
      experience: '2+ years',
      type: 'Container',
      description: 'Container transport from Rotterdam port to various locations in Netherlands and Germany.',
      requirements: ['Valid CE license', 'Port experience preferred', 'ADR certificate advantage', 'Flexible schedule'],
      benefits: ['Port access', 'Regular routes', 'Equipment allowance', 'Holiday pay'],
      urgent: true,
      featured: true,
      premium: false,
      postedDays: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
    },
    {
      id: 'job-005',
      title: 'CE Driver - Refrigerated Transport',
      company: 'Cool Chain Logistics',
      location: 'Eindhoven',
      licenseRequired: 'CE',
      hoursPerWeek: '48-52',
      driversNeeded: 2,
      salaryRange: '€2,900 - €3,400',
      experience: '2+ years',
      type: 'Refrigerated',
      description: 'Specialized in temperature-controlled transport of food products and pharmaceuticals.',
      requirements: ['Valid CE license', 'Reefer experience', 'Temperature monitoring skills', 'Attention to detail'],
      benefits: ['Specialized training', 'Modern reefer trucks', 'Temperature bonus', 'Stable routes'],
      urgent: false,
      featured: false,
      premium: true,
      postedDays: 4,
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=200&fit=crop'
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobVacancies.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesLicense = licenseFilter === 'all' || job.licenseRequired === licenseFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesLicense && matchesType;
  });

  const handleJobApplication = (jobId: string) => {
    if (!user) {
      alert(text.loginToApply);
      onNavigate('login');
      return;
    }

    // Here you would typically navigate to job application form
    console.log(`Applying for job: ${jobId}`);
    alert('Application functionality coming soon!');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('all');
    setLicenseFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{text.title}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={text.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              {text.filters}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={text.location} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allLocations}</SelectItem>
                  <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                  <SelectItem value="Rotterdam">Rotterdam</SelectItem>
                  <SelectItem value="Utrecht">Utrecht</SelectItem>
                  <SelectItem value="Eindhoven">Eindhoven</SelectItem>
                </SelectContent>
              </Select>

              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={text.licenseType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allLicenses}</SelectItem>
                  <SelectItem value="C">C License</SelectItem>
                  <SelectItem value="CE">CE License</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={text.jobType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allTypes}</SelectItem>
                  <SelectItem value="Local Delivery">Local Delivery</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="Fresh Transport">Fresh Transport</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                {text.clearFilters}
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={text.location} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allLocations}</SelectItem>
                  <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                  <SelectItem value="Rotterdam">Rotterdam</SelectItem>
                  <SelectItem value="Utrecht">Utrecht</SelectItem>
                  <SelectItem value="Eindhoven">Eindhoven</SelectItem>
                </SelectContent>
              </Select>

              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={text.licenseType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allLicenses}</SelectItem>
                  <SelectItem value="C">C License</SelectItem>
                  <SelectItem value="CE">CE License</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={text.jobType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allTypes}</SelectItem>
                  <SelectItem value="Local Delivery">Local Delivery</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="Fresh Transport">Fresh Transport</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters} className="w-full">
                {text.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {text.noResults}
              </h3>
              <p className="text-gray-600">
                {text.noResultsDesc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={job.image}
                      alt={job.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {job.urgent && (
                        <Badge variant="destructive">
                          {text.urgent}
                        </Badge>
                      )}
                      {job.featured && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="w-3 h-3 mr-1" />
                          {text.featured}
                        </Badge>
                      )}
                      {job.premium && (
                        <Badge className="bg-purple-600 hover:bg-purple-700">
                          {text.premium}
                        </Badge>
                      )}
                      {job.postedDays <= 3 && (
                        <Badge variant="secondary">
                          {text.newJob}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.hoursPerWeek} {text.hoursPerWeek}
                          </div>
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            {job.licenseRequired}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.driversNeeded} {text.driversNeeded}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-600">
                          <Euro className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{job.salaryRange}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {job.postedDays} {text.daysAgo}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.experience} {text.experience}</Badge>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => console.log('View details:', job.id)}
                        >
                          {text.viewDetails}
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => handleJobApplication(job.id)}
                        >
                          {user ? text.applyNow : text.requiresLogin}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { VacancyCard } from '../../../components/sections/VacancyCard';
import { getVacancies } from '../../../api/vacancies';
import { vacanciesData as staticVacanciesData, vacancyCategories, vacancyLocations } from '../data/vacancies';

// Shape returned by the backend GET /api/jobs (active_jobs_with_clients view)
interface ApiJob {
  job_id: string;
  title: string;
  description: string;
  job_type: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  required_experience_years: number | null;
  application_deadline: string | null;
  start_date: string | null;
  created_at: string;
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
  client_email: string;
}

// Normalise an API job into the shape VacancyCard already supports (VacancyWithText)
function mapApiJobToVacancy(job: ApiJob, index: number) {
  const salaryStr =
    job.salary_min && job.salary_max
      ? `€${Number(job.salary_min).toLocaleString()} - €${Number(job.salary_max).toLocaleString()}`
      : job.salary_min
        ? `From €${Number(job.salary_min).toLocaleString()}`
        : null;

  return {
    id: index + 1,
    title: job.title,
    location: job.location,
    description: job.description || '',
    salary: salaryStr || 'Competitive',
    type: job.job_type ? job.job_type.replace('_', '-') : 'Full-time',
    experience: job.required_experience_years
      ? `${job.required_experience_years}+ years`
      : undefined,
    company: job.company_name,
    posted: job.created_at ? new Date(job.created_at).toISOString().split('T')[0] : undefined,
  };
}

export function VacanciesListSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Live data state
  const [vacancies, setVacancies] = useState<any[]>(staticVacanciesData);
  const [isLoading, setIsLoading] = useState(true);
  const [usingLiveData, setUsingLiveData] = useState(false);

  // Fetch live data on mount; fall back to static data on failure
  useEffect(() => {
    let cancelled = false;
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const apiJobs: ApiJob[] = await getVacancies();
        if (!cancelled && apiJobs && apiJobs.length > 0) {
          setVacancies(apiJobs.map(mapApiJobToVacancy));
          setUsingLiveData(true);
        }
      } catch {
        // API unreachable — keep static data, no error shown to user
        console.info('Jobs API unavailable, using static vacancy data.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchJobs();
    return () => { cancelled = true; };
  }, []);

  // Filter vacancies based on selected filters (supports key-based and text-based data)
  const filteredVacancies = vacancies.filter((vacancy: any) => {
    const vacancyCategory: string | undefined = vacancy.category;
    const matchesCategory = selectedCategory === 'all' || vacancyCategory === selectedCategory;

    const vacancyLocationId: string | undefined = vacancy.locationId;
    const matchesLocation = selectedLocation === 'all'
      ? true
      : (vacancyLocationId ? vacancyLocationId === selectedLocation : (vacancy.location || '').toLowerCase().includes(selectedLocation));

    const titleText = 'titleKey' in vacancy ? t(vacancy.titleKey).toLowerCase() : (vacancy.title || '').toLowerCase();
    const descriptionText = 'descriptionKey' in vacancy ? t(vacancy.descriptionKey).toLowerCase() : (vacancy.description || '').toLowerCase();
    const locationText = 'locationKey' in vacancy ? t(vacancy.locationKey).toLowerCase() : (vacancy.location || '').toLowerCase();

    const search = searchTerm.toLowerCase();
    const matchesSearch =
      titleText.includes(search) ||
      descriptionText.includes(search) ||
      locationText.includes(search);

    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <BackgroundPattern 
      pattern="dots" 
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-24 h-24 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" fill="currentColor" />
            <circle cx="50" cy="60" r="8" fill="white" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-1.5 md:mr-2"></div>
            <span className="text-blue-700 font-medium">
              {usingLiveData ? 'Live from Database' : t('vacancies.hero.filterBadge')}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            {t('vacancies.hero.title')}
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {t('vacancies.hero.subtitle')}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 md:mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('vacancies.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 bg-white border border-gray-200 rounded-xl md:rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
              />
              <svg className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter Buttons — only shown when using static data (live data has no category field) */}
          {!usingLiveData && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {t('vacancies.filters.allCategories')} ({vacancies.length})
              </button>
              {vacancyCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {t(`vacancies.categories.${category.id}`)} ({category.count})
                </button>
              ))}
            </div>
          )}

          {/* Location Filter — only shown when using static data */}
          {!usingLiveData && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedLocation === 'all'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {t('vacancies.filters.allLocations')}
              </button>
              {vacancyLocations.slice(0, 6).map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    selectedLocation === location.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  {t(`vacancies.locations.${location.id}`)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-sm md:text-base text-gray-600">
            {t('vacancies.results.showing')} <span className="font-semibold text-blue-600">{filteredVacancies.length}</span> {t('vacancies.results.of')} <span className="font-semibold">{vacancies.length}</span> {t('vacancies.results.vacancies')}
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4 text-sm">Loading vacancies...</p>
          </div>
        )}

        {/* Vacancies Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredVacancies.length > 0 ? (
              filteredVacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 md:py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t('vacancies.noResults.title')}</h3>
                  <p className="text-gray-600 mb-4">{t('vacancies.noResults.description')}</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedLocation('all');
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    {t('vacancies.noResults.clearFilters')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-16 relative hidden md:block">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#vacancies-list-gradient)" />
            <defs>
              <linearGradient id="vacancies-list-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}

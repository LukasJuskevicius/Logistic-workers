// Simple vacancies page
import { useState, useEffect } from 'react';
import { VacancyCard } from '../components/sections/VacancyCard';
import { vacancies } from '../api/vacancies';

interface VacanciesPageProps {
  onNavigate: (page: string) => void;
}

export function VacanciesPage({ onNavigate }: VacanciesPageProps) {
  const [vacancyList, setVacancyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVacancies = async () => {
      const result = await vacancies.getAll();
      if (result.success) {
        setVacancyList(result.data || []);
      }
      setLoading(false);
    };

    loadVacancies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Vacancies
          </h1>
          <p className="text-lg text-gray-600">
            Find your next opportunity in the logistics industry
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading vacancies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancyList.length > 0 ? (
              vacancyList.map((vacancy: any) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} onNavigate={onNavigate} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No vacancies available at the moment.</p>
                <p className="text-gray-400 mt-2">Please check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
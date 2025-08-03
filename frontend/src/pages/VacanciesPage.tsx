
import { VacancyList } from '../components/features/vacancies/VacancyList';
import { VacancySearch } from '../components/features/vacancies/VacancySearch';

interface VacanciesPageProps {
  user?: any;
  onNavigate: (page: string) => void;
}

export function VacanciesPage({ user, onNavigate }: VacanciesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Available Positions</h1>
            <p className="mt-1 text-sm text-gray-600">
              Find driving and logistics opportunities across Europe
            </p>
          </div>
          
          <div className="mb-6">
            <VacancySearch />
          </div>
          
          <VacancyList user={user} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
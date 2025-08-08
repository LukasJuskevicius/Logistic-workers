import { Card } from '../ui/Card';

// Vacancy data interface
interface Vacancy {
  id: number;
  title: string;
  location: string;
  description: string;
}

// Vacancy card props
interface VacancyCardProps {
  vacancy: Vacancy;
  onNavigate: (page: string) => void;
}

// Specific vacancy card implementation
export function VacancyCard({ vacancy, onNavigate }: VacancyCardProps) {
  return (
    <Card>
      {/* Card Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="text-xs md:text-sm text-gray-500 font-medium">
            #{vacancy.id.toString().padStart(2, '0')}
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {vacancy.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-3 md:mb-4">
          <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm md:text-base font-medium">{vacancy.location}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="mb-4 md:mb-6">
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {vacancy.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-auto">
        <button 
          onClick={() => onNavigate('vacancies')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
        >
          View Details
          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Card>
  );
}

import { VacancyCarousel } from './VacancyCarousel';

// Props for the Latest Opportunities Section
interface LatestOpportunitiesSectionProps {
  onNavigate: (page: string) => void;
}

export function LatestOpportunitiesSection({ onNavigate }: LatestOpportunitiesSectionProps) {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Driving Opportunities
          </h2>
        </div>
        
        {/* Carousel Component */}
        <VacancyCarousel onNavigate={onNavigate} />
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('vacancies')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Vacancies
          </button>
        </div>
      </div>
    </div>
  );
} 
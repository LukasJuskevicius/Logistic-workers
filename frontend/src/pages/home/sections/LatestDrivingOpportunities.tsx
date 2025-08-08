import { Carousel } from '../../../components/ui/Carousel';
import { VacancyCard } from '../../../components/sections/VacancyCard';
import { latestDrivingOpportunities } from '../data/LatestDrivingOpportunities';

interface Props {
  // Pass navigation to carousel buttons
  onNavigate: (page: string) => void;
}

// Latest Driving Opportunities section - shows job vacancies carousel
export function LatestDrivingOpportunities({ onNavigate }: Props) {
  return (
    <Carousel
      items={latestDrivingOpportunities}
      renderItem={(vacancy) => (
        <VacancyCard vacancy={vacancy} onNavigate={onNavigate} />
      )}
      title="Latest Driving Opportunities"
      subtitle="Discover exciting career opportunities with leading logistics companies across Europe"
      onNavigate={onNavigate}
      navigationButtonText="View All Vacancies"
    />
  );
}

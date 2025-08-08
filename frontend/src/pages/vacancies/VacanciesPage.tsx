import { VacanciesHeroSection } from './sections/VacanciesHeroSection';
import { VacanciesListSection } from './sections/VacanciesListSection';

interface VacanciesPageProps {
  onNavigate: (page: string) => void;
}

export function VacanciesPage({ onNavigate }: VacanciesPageProps) {
  return (
    <div className="min-h-screen">
      <VacanciesHeroSection onNavigate={onNavigate} />
      <VacanciesListSection onNavigate={onNavigate} />
    </div>
  );
}

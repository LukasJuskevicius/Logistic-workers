import { VacanciesHeroSection } from './sections/VacanciesHeroSection';
import { VacanciesListSection } from './sections/VacanciesListSection';

export function VacanciesPage() {
  return (
    <div className="min-h-screen">
      <VacanciesHeroSection />
      <VacanciesListSection />
    </div>
  );
}

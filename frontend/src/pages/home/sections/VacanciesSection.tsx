import { VacancyCarousel } from '../../../components/VacancyCarousel';

interface Props {
  // Pass navigation to carousel buttons
  onNavigate: (page: string) => void;
}

// Thin wrapper to keep HomePage lean
export function VacanciesSection({ onNavigate }: Props) {
  return <VacancyCarousel onNavigate={onNavigate} />;
}



import { HeroSection } from './sections/HeroSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { VacanciesSection } from './sections/VacanciesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CallToActionSection } from './sections/CallToActionSection';

// Homepage orchestrates page sections and passes navigation handler
interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <WhyChooseUsSection />
      <VacanciesSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <CallToActionSection onNavigate={onNavigate} />
    </div>
  );
}

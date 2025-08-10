import DriversHeroSection from './sections/DriversHeroSection';
import DriversBenefitsSection from './sections/DriversBenefitsSection';
import DriversPositionsSection from './sections/DriversPositionsSection';
import DriversRequirementsSection from './sections/DriversRequirementsSection';
import DriversProcessSection from './sections/DriversProcessSection';
import DriversTestimonialsSection from './sections/DriversTestimonialsSection';

interface DriversPageProps {
  onNavigate: (page: string) => void;
}

export function DriversPage({ onNavigate }: DriversPageProps) {
  return (
    <div className="min-h-screen">
      <DriversHeroSection />
      <DriversBenefitsSection />
      <DriversPositionsSection />
      <DriversRequirementsSection />
      <DriversProcessSection />
      <DriversTestimonialsSection />
    </div>
  );
}

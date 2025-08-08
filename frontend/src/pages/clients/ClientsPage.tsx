import { ClientsHeroSection } from './sections/ClientsHeroSection';
import { ClientsServicesSection } from './sections/ClientsServicesSection';
import { ClientsProcessSection } from './sections/ClientsProcessSection';
import { ClientsTestimonialsSection } from './sections/ClientsTestimonialsSection';
import { ClientsRequirementsSection } from './sections/ClientsRequirementsSection';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
}

export function ClientsPage({ onNavigate }: ClientsPageProps) {
  return (
    <div className="min-h-screen">
      <ClientsHeroSection onNavigate={onNavigate} />
      <ClientsServicesSection />
      <ClientsProcessSection />
      <ClientsTestimonialsSection />
      <ClientsRequirementsSection />
    </div>
  );
}

import { ClientsHeroSection } from './sections/ClientsHeroSection';
import { ClientsServicesSection } from './sections/ClientsServicesSection';
import { ClientsProcessSection } from './sections/ClientsProcessSection';
import { ClientsTestimonialsSection } from './sections/ClientsTestimonialsSection';
import { ClientsRequirementsSection } from './sections/ClientsRequirementsSection';


export function ClientsPage() {
  return (
    <div className="min-h-screen">
      <ClientsHeroSection />
      <ClientsServicesSection />
      <ClientsProcessSection />
      <ClientsTestimonialsSection />
      <ClientsRequirementsSection />
    </div>
  );
}

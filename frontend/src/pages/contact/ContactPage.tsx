import { ContactHeroSection } from './sections/ContactHeroSection';
import { ContactFormSection } from './sections/ContactFormSection';
import { ContactInfoSection } from './sections/ContactInfoSection';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
    </div>
  );
}

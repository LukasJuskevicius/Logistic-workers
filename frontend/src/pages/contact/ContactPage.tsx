import { ContactHeroSection } from './sections/ContactHeroSection';
import { ContactFormSection } from './sections/ContactFormSection';
import { ContactInfoSection } from './sections/ContactInfoSection';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="min-h-screen">
      <ContactHeroSection onNavigate={onNavigate} />
      <ContactFormSection onNavigate={onNavigate} />
      <ContactInfoSection onNavigate={onNavigate} />
    </div>
  );
}

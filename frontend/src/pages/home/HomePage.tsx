import { HeroSection } from './sections/HeroSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { LatestDrivingOpportunities } from './sections/LatestDrivingOpportunities';
import { WhatOurDriversSay } from './sections/WhatOurDriversSay';
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
      <LatestDrivingOpportunities onNavigate={onNavigate} />
      <WhatOurDriversSay />
      <CallToActionSection onNavigate={onNavigate} />
    </div>
  );
}

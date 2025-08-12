import { HeroSection } from './sections/HeroSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { LatestDrivingOpportunities } from './sections/LatestDrivingOpportunities';
import { WhatOurDriversSay } from './sections/WhatOurDriversSay';
import { CallToActionSection } from './sections/CallToActionSection';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhyChooseUsSection />
      <LatestDrivingOpportunities />
      <WhatOurDriversSay />
      <CallToActionSection />
    </div>
  );
}

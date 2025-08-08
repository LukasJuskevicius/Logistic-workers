import { Carousel } from '../../../components/ui/Carousel';
import { TestimonialCard } from '../../../components/sections/TestimonialCard';
import { whatOurDriversSay } from '../data/WhatOurDriversSay';

// What Our Drivers Say section - testimonial carousel
export function WhatOurDriversSay() {
  return (
    <Carousel
      items={whatOurDriversSay}
      renderItem={(testimonial) => (
        <TestimonialCard testimonial={testimonial} />
      )}
      title="What Our Drivers Say"
      subtitle="Real testimonials from our satisfied drivers and clients across Europe"
    />
  );
}

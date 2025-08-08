import { useEffect, useState } from 'react';
import { testimonials } from '../data/testimonials';

// Simple responsive helper local to this section
function useBreakpoint() {
  const [bp, setBp] = useState<'small' | 'phone' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 480) setBp('small');
      else if (w < 768) setBp('phone');
      else if (w < 1024) setBp('tablet');
      else setBp('desktop');
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
}

// Testimonial carousel mirrors vacancy carousel behavior
export function TestimonialsSection() {
  const bp = useBreakpoint();
  const [index, setIndex] = useState(0);
  const max = testimonials.length - 1;

  const transformPct = bp === 'small' ? 85 : bp === 'phone' ? 80 : bp === 'tablet' ? 75 : 80;
  const cardWidth = bp === 'small' ? 'w-[85%]' : bp === 'phone' ? 'w-[80%]' : bp === 'tablet' ? 'w-[75%]' : 'w-[80%]';

  return (
    <div className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">What Our Drivers Say</h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">Real testimonials from our satisfied drivers and clients across Europe</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIndex(prev => (prev === 0 ? max : prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all z-20"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>

          <button
            onClick={() => setIndex(prev => (prev === max ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all z-20"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>

          <div className="px-12 md:px-16 lg:px-20">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
              <div className="flex transition-all duration-500 ease-out" style={{ transform: `translateX(-${index * transformPct}%)` }}>
                {testimonials.map(t => (
                  <div key={t.id} className={`flex-shrink-0 transition-all duration-300 ${cardWidth}`}>
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 md:p-8 h-full border border-gray-100 hover:border-blue-200">
                      <div className="mb-6 flex justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed italic mb-4">"{t.quote}"</p>
                        <div className="flex justify-center mb-4">
                          {[...Array(t.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-4"><span className="text-white font-semibold text-sm">{t.avatar}</span></div>
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">{t.name}</h4>
                          <p className="text-gray-600 text-xs md:text-sm">{t.role}</p>
                          <p className="text-gray-500 text-xs">{t.company} • {t.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 md:mt-8">
            <div className="flex space-x-1 md:space-x-2">
              {Array.from({ length: testimonials.length }).map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} aria-label={`Go to testimonial ${i + 1}`} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${i === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



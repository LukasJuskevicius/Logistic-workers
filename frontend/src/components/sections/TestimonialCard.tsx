import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';

// Testimonial data interface
interface Testimonial {
  id: number;
  name: string;
  roleKey: string;
  companyKey: string;
  avatar: string;
  quote: {
    en: string;
    lt: string;
    ro: string;
    uk: string;
    nl: string;
    pl: string;
  };
  rating: number;
  locationKey: string;
}

// Testimonial card props
interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Specific testimonial card implementation with aligned author info and stars
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as keyof typeof testimonial.quote;
  
  return (
    <Card className="flex flex-col h-full">
      {/* Quote icon - top section */}
      <div className="mb-6 flex justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
      </div>
      
      {/* Quote - flex-grow to push stars and author info to bottom */}
      <div className="flex-grow mb-4">
        <p className="text-sm md:text-base text-gray-600 leading-relaxed italic">
          "{testimonial.quote[currentLanguage] || testimonial.quote.en}"
        </p>
      </div>

      {/* Stars - fixed position above author info */}
      <div className="flex justify-center mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      
      {/* Author information - always at bottom */}
      <div className="mt-auto flex items-center justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
        </div>
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
          <p className="text-gray-600 text-xs md:text-sm">{t(testimonial.roleKey)}</p>
          <p className="text-gray-500 text-xs">{t(testimonial.companyKey)} • {t(testimonial.locationKey)}</p>
        </div>
      </div>
    </Card>
  );
}

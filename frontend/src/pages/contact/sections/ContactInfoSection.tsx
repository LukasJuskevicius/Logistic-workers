import { useTranslation } from 'react-i18next';
import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { contactMethods, businessHours } from '../data/contact';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'email':
      return (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'phone':
      return (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case 'location':
      return (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export function ContactInfoSection() {
  const { t } = useTranslation();
  return (
    <BackgroundPattern
      pattern="circles"
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-white via-gray-50 to-purple-50 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-24 h-24 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 animate-bounce">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 80 L50 20 L80 80 Z" fill="currentColor" />
            <circle cx="50" cy="60" r="8" fill="white" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10 animate-spin">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs md:text-sm mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 rounded-full mr-1.5 md:mr-2"></div>
                <span className="font-medium">{t('contact.info.badge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
                {t('contact.info.title')}
              </h2>

              <p className="text-sm md:text-base text-gray-600 mb-8">
                {t('contact.info.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        {getIcon(method.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        {t(method.titleKey)}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-3">
                        {t(method.descriptionKey)}
                      </p>
                      <p className="text-base md:text-lg font-medium text-gray-900 mb-4">
                        {method.contact}
                      </p>
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                        {t(method.actionKey)}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours and Additional Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-1.5 md:mr-2"></div>
                <span className="font-medium">{t('contact.hours.badge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent">
                {t('contact.hours.title')}
              </h2>

              <p className="text-sm md:text-base text-gray-600 mb-8">
                {t('contact.hours.subtitle')}
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">{t('contact.hours.businessHours')}</h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm md:text-base text-gray-700 font-medium">{t(schedule.dayKey)}</span>
                    <span className={`text-sm md:text-base font-medium ${schedule.status === 'closed' ? 'text-gray-400' : 'text-gray-900'}`}>
                      {t(schedule.hoursKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">{t('contact.additional.title')}</h3>
              <div className="space-y-4 text-sm md:text-base text-gray-600">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{t('contact.additional.responseTime')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>{t('contact.additional.confidential')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{t('contact.additional.countries')}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 md:p-8 text-white">
              <h3 className="text-lg md:text-xl font-semibold mb-3">{t('contact.urgent.title')}</h3>
              <p className="text-purple-100 mb-4 text-sm md:text-base">
                {t('contact.urgent.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                  {t('contact.urgent.callNow')}
                </button>
                <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors duration-300">
                  {t('contact.urgent.sendEmail')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-16 relative hidden md:block">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#contact-info-gradient)" />
            <defs>
              <linearGradient id="contact-info-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}

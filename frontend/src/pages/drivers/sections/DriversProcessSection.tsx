import React from 'react';
import { useTranslation } from 'react-i18next';
import { driverProcess } from '../data/drivers';

const DriversProcessSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t('drivers.process.badge')}
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('drivers.process.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('drivers.process.subtitle')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {driverProcess.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  {index + 1}
                </div>

                {/* Connecting Line */}
                {index < driverProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 transform translate-x-1/2"></div>
                )}

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t(step.durationKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t('drivers.process.readyToStart')}
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            {t('drivers.process.startApplication')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DriversProcessSection;

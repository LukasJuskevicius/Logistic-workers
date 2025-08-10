import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { driverStats } from '../data/drivers';

const DriversHeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block bg-blue-600 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t('drivers.hero.badge')}
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('drivers.hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            {t('drivers.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/drivers/apply"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t('drivers.hero.applyNow')}
            </Link>
            <Link
              to="/"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              {t('drivers.hero.backToHome')}
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {driverStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriversHeroSection;

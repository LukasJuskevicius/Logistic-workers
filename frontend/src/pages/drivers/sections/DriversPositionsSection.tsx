import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { driverPositions, driverJobCategories, driverLocations } from '../data/drivers';

const DriversPositionsSection: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter positions based on selected category and location
  const filteredPositions = useMemo(() => {
    return driverPositions.filter(position => {
      const categoryMatch = selectedCategory === 'all' || 
        (selectedCategory === 'international' && position.locationKey.includes('international')) ||
        (selectedCategory === 'local' && position.locationKey.includes('local')) ||
        (selectedCategory === 'specialized' && position.locationKey.includes('specialized')) ||
        (selectedCategory === 'express' && position.locationKey.includes('express'));
      
      const locationMatch = selectedLocation === 'all' || 
        position.locationKey.includes(selectedLocation);
      
      return categoryMatch && locationMatch;
    });
  }, [selectedCategory, selectedLocation]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t('drivers.positions.badge')}
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('drivers.positions.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('drivers.positions.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('drivers.positions.allCategories')}</option>
                {driverJobCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.nameKey)} ({category.count} {t('drivers.positions.positions')}, {t('drivers.positionsMeta.avg')} {category.avgSalary})
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="flex-1">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('drivers.positions.allLocations')}</option>
                {driverLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {t(location.nameKey)} ({location.count} {t('drivers.positions.positions')}, {t('drivers.positionsMeta.avg')} {location.avgSalary})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <p className="text-gray-600">
            {t('drivers.positions.showing')} <span className="font-semibold">{filteredPositions.length}</span> {t('drivers.positions.of')} {driverPositions.length} {t('drivers.positions.positions')}
          </p>
        </div>

        {/* Positions Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPositions.map((position) => (
              <div key={position.id} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t(position.titleKey)}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {t(position.locationKey)}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-gray-500 text-sm">{t('drivers.positionsMeta.experience')}</span>
                    <p className="font-semibold text-gray-900">{position.experience}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">{t('drivers.positionsMeta.salary')}</span>
                    <p className="font-semibold text-green-600">{position.salary}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t(position.descriptionKey)}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{t('drivers.positions.benefits')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.benefits.map((benefit, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {t(benefit)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{t('drivers.positions.requirements')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((requirement, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {t(requirement)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                  {t('drivers.positions.applyNow')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {filteredPositions.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-gray-500 text-lg">
              {t('drivers.positionsMeta.noResults')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DriversPositionsSection;

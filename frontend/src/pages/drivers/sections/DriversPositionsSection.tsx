import { useState } from 'react';
import { BackgroundPattern } from '../../../components/ui/BackgroundPattern';
import { driverPositions, driverJobCategories, driverLocations } from '../data/drivers';

interface DriversPositionsSectionProps {
  onNavigate: (page: string) => void;
}

export function DriversPositionsSection({ onNavigate }: DriversPositionsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Filter positions based on selected filters
  const filteredPositions = driverPositions.filter(position => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'international' && position.location.includes('International')) ||
      (selectedCategory === 'local' && !position.location.includes('International')) ||
      (selectedCategory === 'specialized' && position.title.includes('Refrigerated')) ||
      (selectedCategory === 'express' && position.title.includes('Express'));
    
    const matchesLocation = selectedLocation === 'all' || 
      position.location.toLowerCase().includes(selectedLocation);

    return matchesCategory && matchesLocation;
  });

  return (
    <BackgroundPattern 
      pattern="dots" 
      opacity={0.03}
      className="relative py-12 md:py-24 bg-gradient-to-br from-white via-orange-50 to-red-50 overflow-hidden"
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
        {/* Enhanced header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full mr-1.5 md:mr-2"></div>
            <span className="text-orange-700 font-medium">Available Positions</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-red-900 bg-clip-text text-transparent">
            Latest Opportunities
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Browse through our latest job opportunities and find the perfect position for your skills
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            All Categories ({driverPositions.length})
          </button>
          {driverJobCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {category.name} ({category.count}) - {category.avgSalary}
            </button>
          ))}
        </div>

        {/* Location Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          <button
            onClick={() => setSelectedLocation('all')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
              selectedLocation === 'all'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'
            }`}
          >
            All Locations
          </button>
          {driverLocations.slice(0, 6).map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedLocation === location.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'
              }`}
            >
              {location.name} - {location.avgSalary}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-sm md:text-base text-gray-600">
            Showing <span className="font-semibold text-orange-600">{filteredPositions.length}</span> of <span className="font-semibold">{driverPositions.length}</span> positions
          </p>
        </div>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPositions.map((position) => (
            <div key={position.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {position.title}
                  </h3>
                  <div className="flex items-center text-sm md:text-base text-gray-600 mb-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {position.location}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
                    {position.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium mr-2">
                      {position.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {position.experience}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 flex-grow">
                  {position.description}
                </p>

                {/* Benefits */}
                <div className="mb-4 md:mb-6">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">Benefits:</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {position.benefits.slice(0, 3).map((benefit, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {benefit}
                      </span>
                    ))}
                    {position.benefits.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        +{position.benefits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4 md:mb-6">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">Requirements:</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {position.requirements.slice(0, 2).map((requirement, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {requirement}
                      </span>
                    ))}
                    {position.requirements.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        +{position.requirements.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative wave */}
        <div className="mt-8 md:mt-16 relative hidden md:block">
          <svg viewBox="0 0 1200 60" fill="none" className="w-full h-auto">
            <path d="M0 60 L0 30 Q300 0 600 30 T1200 30 L1200 60 Z" fill="url(#positions-gradient)" />
            <defs>
              <linearGradient id="positions-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#DC2626" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </BackgroundPattern>
  );
}

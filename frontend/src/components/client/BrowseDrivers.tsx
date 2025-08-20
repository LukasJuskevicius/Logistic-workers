import React, { useState } from 'react';

const BrowseDrivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    vehicleType: '',
    availability: ''
  });

  const [drivers] = useState([
    {
      id: 1,
      driver: {
        name: 'Petras Kazlauskas',
        email: 'petras.kazlauskas@gmail.com',
        location: 'Kaunas, Lithuania',
        rating: 4.8,
        reviews: 24,
        experience: '12 years',
        licenseType: 'CE',
        verified: true
      },
      advertisement: {
        title: 'Experienced CE Driver Available for Long-Haul Routes',
        description: 'Professional truck driver with 12+ years of experience in international transport. Specialized in HazMat and refrigerated goods. Clean driving record, own accommodation, flexible schedule.',
        hourlyRate: 18.50,
        availability: 'Available Immediately',
        vehicleType: 'Semi-trailer',
        preferredRoutes: 'Lithuania - Germany, Baltic States - Western Europe',
        specializations: ['HazMat', 'Refrigerated', 'International', 'Long Haul'],
        responseRate: '95%',
        responseTime: '< 2 hours'
      }
    },
    {
      id: 2,
      driver: {
        name: 'Jonas Petraitis',
        email: 'jonas.petraitis@gmail.com',
        location: 'Vilnius, Lithuania',
        rating: 4.6,
        reviews: 18,
        experience: '8 years',
        licenseType: 'C',
        verified: true
      },
      advertisement: {
        title: 'Local Delivery Specialist - Van Driver Available',
        description: 'Reliable van driver specializing in local and regional deliveries. Own Mercedes Sprinter van, GPS tracking, professional customer service.',
        hourlyRate: 14.00,
        availability: 'Available in 1 Week',
        vehicleType: 'Van',
        preferredRoutes: 'Vilnius region, Baltic capitals',
        specializations: ['Local Delivery', 'Same-day', 'E-commerce'],
        responseRate: '88%',
        responseTime: '< 4 hours'
      }
    },
    {
      id: 3,
      driver: {
        name: 'Andrius Jankauskas',
        email: 'andrius.jankauskas@gmail.com',
        location: 'Šiauliai, Lithuania',
        rating: 4.9,
        reviews: 31,
        experience: '15 years',
        licenseType: 'CE',
        verified: true
      },
      advertisement: {
        title: 'Premium International Transport - Specialized Equipment',
        description: 'Senior driver with specialized equipment for oversized and sensitive cargo. Fluent in English, German. Premium service for high-value shipments.',
        hourlyRate: 22.00,
        availability: 'Available in 2 Weeks',
        vehicleType: 'Specialized Trailer',
        preferredRoutes: 'EU-wide, Scandinavia specialty',
        specializations: ['Oversized', 'High-value', 'International', 'Specialized Equipment'],
        responseRate: '98%',
        responseTime: '< 1 hour'
      }
    }
  ]);

  const handleContact = (driver: any) => {
    console.log('Contacting driver:', driver.driver.name);
  };

  const handleHire = (driver: any) => {
    console.log('Hiring driver:', driver.driver.name);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          Find Available Drivers
        </h1>
        <p style={{ color: '#6b7280' }}>
          Browse verified drivers looking for work. Contact them directly or post a job.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search */}
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '12px', 
                color: '#9ca3af',
                fontSize: '16px'
              }}>🔍</span>
              <input 
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                placeholder="Search by location, specialization, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '160px'
              }}
              value={filters.vehicleType} 
              onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}
            >
              <option value="">Vehicle Type</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="semi-trailer">Semi-trailer</option>
              <option value="specialized">Specialized</option>
            </select>

            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '160px'
              }}
              value={filters.availability} 
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
            >
              <option value="">Availability</option>
              <option value="immediate">Immediate</option>
              <option value="1week">Within 1 Week</option>
              <option value="2weeks">Within 2 Weeks</option>
              <option value="1month">Within 1 Month</option>
            </select>

            <button style={{
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🔧</span>
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        {drivers.map((driver) => (
          <div 
            key={driver.id} 
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Driver Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontWeight: '600', margin: 0, fontSize: '16px' }}>
                      {driver.driver.name}
                    </h3>
                    {driver.driver.verified && (
                      <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    )}
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>📍</span>
                    {driver.driver.location}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#059669', 
                  margin: 0 
                }}>
                  €{driver.advertisement.hourlyRate}/hr
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '14px',
                  justifyContent: 'flex-end'
                }}>
                  <span style={{ color: '#fbbf24' }}>⭐</span>
                  <span>{driver.driver.rating} ({driver.driver.reviews})</span>
                </div>
              </div>
            </div>

            {/* Advertisement Title */}
            <h4 style={{ 
              fontWeight: '500', 
              marginBottom: '8px', 
              fontSize: '15px',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {driver.advertisement.title}
            </h4>

            {/* Description */}
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280', 
              marginBottom: '12px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {driver.advertisement.description}
            </p>

            {/* Key Info */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🚛</span>
                  {driver.advertisement.vehicleType}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⏰</span>
                  {driver.advertisement.availability}
                </span>
              </div>
              
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                <span style={{ fontWeight: '500' }}>Routes:</span> {driver.advertisement.preferredRoutes}
              </div>
              
              <div style={{ fontSize: '14px' }}>
                <span style={{ fontWeight: '500' }}>Experience:</span> {driver.driver.experience} • 
                <span style={{ fontWeight: '500' }}> License:</span> {driver.driver.licenseType}
              </div>
            </div>

            {/* Specializations */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
              {driver.advertisement.specializations.slice(0, 3).map((spec) => (
                <span 
                  key={spec}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {spec}
                </span>
              ))}
              {driver.advertisement.specializations.length > 3 && (
                <span style={{
                  backgroundColor: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  +{driver.advertisement.specializations.length - 3}
                </span>
              )}
            </div>

            {/* Response Stats */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '12px', 
              color: '#9ca3af',
              marginBottom: '16px'
            }}>
              <span>Response rate: {driver.advertisement.responseRate}</span>
              <span>Responds in {driver.advertisement.responseTime}</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => handleContact(driver)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <span>💬</span>
                Message
              </button>
              <button 
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => handleHire(driver)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                <span>📅</span>
                Hire Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button style={{
          padding: '12px 24px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: 'white',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Load More Drivers
        </button>
      </div>
    </div>
  );
};

export default BrowseDrivers;

import React, { useState } from 'react';

const ReviewAdvertisements = () => {
  const [pendingAds] = useState([
    {
      id: 1,
      driver: {
        name: 'Petras Kazlauskas',
        email: 'petras.kazlauskas@gmail.com',
        location: 'Kaunas, Lithuania',
        rating: 4.8,
        reviews: 24,
        experience: '12 years',
        licenseType: 'CE'
      },
      advertisement: {
        title: 'Experienced CE Driver Available for Long-Haul Routes',
        description: 'Professional truck driver with 12+ years of experience in international transport. Specialized in HazMat and refrigerated goods. Clean driving record, own accommodation, flexible schedule. Available for routes across Europe, particularly Lithuania-Germany corridor.',
        hourlyRate: 18.50,
        availability: 'Available Immediately',
        vehicleType: 'Semi-trailer',
        preferredRoutes: 'Lithuania - Germany, Baltic States - Western Europe',
        specializations: ['HazMat', 'Refrigerated', 'International', 'Long Haul'],
        submittedAt: '2024-01-15T10:30:00Z'
      },
      status: 'pending'
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
        licenseType: 'C'
      },
      advertisement: {
        title: 'Local Delivery Specialist - Van Driver Available',
        description: 'Reliable van driver specializing in local and regional deliveries. Own Mercedes Sprinter van, GPS tracking, professional customer service. Perfect for same-day deliveries, e-commerce fulfillment, and urgent transport needs.',
        hourlyRate: 14.00,
        availability: 'Available in 1 Week',
        vehicleType: 'Van',
        preferredRoutes: 'Vilnius region, Baltic capitals',
        specializations: ['Local Delivery', 'Same-day', 'E-commerce'],
        submittedAt: '2024-01-14T15:45:00Z'
      },
      status: 'pending'
    }
  ]);

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleApprove = (adId: number) => {
    console.log('Approving advertisement:', adId);
    // API call to approve
  };

  const handleReject = (adId: number) => {
    console.log('Rejecting advertisement:', adId, 'Notes:', reviewNotes);
    // API call to reject with notes
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          Review Driver Advertisements
        </h1>
        <p style={{ color: '#6b7280' }}>
          Review and approve driver advertisements before they go live for clients.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Pending Advertisements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Pending Approval ({pendingAds.length})
          </h2>
          
          {pendingAds.map((ad) => (
            <div 
              key={ad.id} 
              style={{
                backgroundColor: 'white',
                border: selectedAd?.id === ad.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedAd?.id === ad.id ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => setSelectedAd(ad)}
              onMouseEnter={(e) => {
                if (selectedAd?.id !== ad.id) {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAd?.id !== ad.id) {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    👤
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', margin: 0, fontSize: '16px', color: '#1f2937' }}>
                      {ad.driver.name}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>📍</span>
                      {ad.driver.location}
                    </p>
                  </div>
                </div>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  height: 'fit-content'
                }}>
                  <span>⏰</span>
                  Pending
                </span>
              </div>

              <h4 style={{ fontWeight: '500', marginBottom: '8px', fontSize: '15px', color: '#1f2937' }}>
                {ad.advertisement.title}
              </h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>€</span>
                    €{ad.advertisement.hourlyRate}/hr
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🚛</span>
                    {ad.advertisement.vehicleType}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                  <span style={{ color: '#fbbf24' }}>⭐</span>
                  <span>{ad.driver.rating}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {ad.advertisement.specializations.slice(0, 3).map(spec => (
                  <span key={spec} style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {spec}
                  </span>
                ))}
                {ad.advertisement.specializations.length > 3 && (
                  <span style={{
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}>
                    +{ad.advertisement.specializations.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Review Panel */}
        <div style={{ position: 'sticky', top: '24px' }}>
          {selectedAd ? (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                padding: '24px 24px 0 24px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                    Review Advertisement
                  </h2>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}>
                    <span>👁️</span>
                    View Driver Profile
                  </button>
                </div>
              </div>
              
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Driver Info */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '16px',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: '#1f2937' }}>
                    Driver Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                    <div>
                      <span style={{ color: '#6b7280' }}>Name:</span>
                      <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                        {selectedAd.driver.name}
                      </p>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280' }}>Experience:</span>
                      <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                        {selectedAd.driver.experience}
                      </p>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280' }}>License:</span>
                      <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                        {selectedAd.driver.licenseType}
                      </p>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280' }}>Rating:</span>
                      <p style={{ 
                        fontWeight: '500', 
                        margin: '4px 0 0 0', 
                        color: '#1f2937',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ color: '#fbbf24' }}>⭐</span>
                        {selectedAd.driver.rating} ({selectedAd.driver.reviews} reviews)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advertisement Details */}
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: '#1f2937' }}>
                    Advertisement Details
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Title:</span>
                      <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                        {selectedAd.advertisement.title}
                      </p>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Description:</span>
                      <p style={{ fontSize: '14px', margin: '4px 0 0 0', lineHeight: '1.5', color: '#374151' }}>
                        {selectedAd.advertisement.description}
                      </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Rate:</span>
                        <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                          €{selectedAd.advertisement.hourlyRate}/hr
                        </p>
                      </div>
                      <div>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Availability:</span>
                        <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                          {selectedAd.advertisement.availability}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Preferred Routes:</span>
                      <p style={{ fontWeight: '500', margin: '4px 0 0 0', color: '#1f2937' }}>
                        {selectedAd.advertisement.preferredRoutes}
                      </p>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Specializations:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {selectedAd.advertisement.specializations.map((spec: string) => (
                          <span key={spec} style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                    Review Notes (Optional)
                  </label>
                  <textarea 
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical',
                      minHeight: '80px'
                    }}
                    placeholder="Add any notes about this advertisement..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onClick={() => handleApprove(selectedAd.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#047857';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#059669';
                    }}
                  >
                    <span>✅</span>
                    Approve Advertisement
                  </button>
                  <button 
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onClick={() => handleReject(selectedAd.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b91c1c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                    }}
                  >
                    <span>❌</span>
                    Reject
                  </button>
                </div>

                <button style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}>
                  <span>💬</span>
                  Contact Driver for Clarification
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ padding: '64px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>👁️</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                  Select an Advertisement
                </h3>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  Choose an advertisement from the list to review its details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewAdvertisements;

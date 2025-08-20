import React, { useState } from 'react';

const CreateAdvertisement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hourlyRate: '',
    availability: '',
    preferredRoutes: '',
    vehicleType: '',
    experience: '',
    specializations: [] as string[]
  });

  const [specializations, setSpecializations] = useState([
    'HazMat', 'Refrigerated', 'Oversized', 'International', 'Local Delivery', 'Long Haul'
  ]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
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
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#1f2937'
          }}>
            <span style={{ fontSize: '24px' }}>🚛</span>
            Create Driver Advertisement
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Post your availability and let clients find you! Your ad will be reviewed by admin before going live.
          </p>
        </div>
        
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
              Advertisement Title
            </label>
            <input 
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              placeholder="e.g., Experienced CE Driver Available for Long-Haul Routes"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
              Description
            </label>
            <textarea 
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
                minHeight: '100px'
              }}
              placeholder="Describe your experience, availability, and what makes you a great driver..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Rate and Availability */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                Hourly Rate (EUR)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '12px',
                  color: '#9ca3af',
                  fontSize: '16px'
                }}>€</span>
                <input 
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 32px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  placeholder="15.50"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                Availability
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
                value={formData.availability} 
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              >
                <option value="">Select availability</option>
                <option value="immediate">Available Immediately</option>
                <option value="1week">Available in 1 Week</option>
                <option value="2weeks">Available in 2 Weeks</option>
                <option value="1month">Available in 1 Month</option>
              </select>
            </div>
          </div>

          {/* Vehicle Type and Routes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                Vehicle Type
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
                value={formData.vehicleType} 
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              >
                <option value="">Select vehicle type</option>
                <option value="truck">Truck</option>
                <option value="semi-trailer">Semi-trailer</option>
                <option value="van">Van</option>
                <option value="refrigerated">Refrigerated Truck</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                Preferred Routes
              </label>
              <input 
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                placeholder="e.g., Lithuania - Germany, Baltic States"
                value={formData.preferredRoutes}
                onChange={(e) => setFormData({...formData, preferredRoutes: e.target.value})}
              />
            </div>
          </div>

          {/* Specializations */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
              Specializations
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {specializations.map((spec) => {
                const isSelected = formData.specializations.includes(spec);
                return (
                  <span 
                    key={spec}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      border: isSelected ? 'none' : '1px solid #d1d5db',
                      backgroundColor: isSelected ? '#3b82f6' : 'white',
                      color: isSelected ? 'white' : '#374151',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => {
                      const updated = formData.specializations.includes(spec)
                        ? formData.specializations.filter(s => s !== spec)
                        : [...formData.specializations, spec];
                      setFormData({...formData, specializations: updated});
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    {spec}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              Advertisement Preview
            </h3>
            <div style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '4px', color: '#1f2937' }}>
                    {formData.title || "Advertisement Title"}
                  </h4>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>📍</span>
                    Petras Kazlauskas • Kaunas, Lithuania
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>
                    €{formData.hourlyRate || "15.50"}/hr
                  </p>
                  <span style={{
                    fontSize: '12px',
                    padding: '2px 8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>⏰</span>
                    {formData.availability || "Available"}
                  </span>
                </div>
              </div>
              
              <p style={{ color: '#374151', marginBottom: '12px', lineHeight: '1.5' }}>
                {formData.description || "Your description will appear here..."}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>🚛</span>
                  {formData.vehicleType || "Vehicle Type"}
                </span>
                {formData.specializations.map(spec => (
                  <span key={spec} style={{
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {spec}
                  </span>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px', 
                color: '#6b7280'
              }}>
                <span>Routes: {formData.preferredRoutes || "Preferred routes"}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#fbbf24' }}>⭐</span>
                  <span>4.8 (24 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <button style={{
              flex: 1,
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}>
              <span>✓</span>
              Submit for Review
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}>
              Save Draft
            </button>
          </div>
          
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            backgroundColor: '#dbeafe',
            padding: '12px',
            borderRadius: '8px',
            lineHeight: '1.5'
          }}>
            <strong>Note:</strong> Your advertisement will be reviewed by our admin team within 24 hours. 
            Once approved, it will be visible to clients in the "Find Drivers" section.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvertisement;

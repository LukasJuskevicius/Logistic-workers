import React, { useState } from 'react';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@logistics.com',
    phone: '+370 600 12345',
    role: 'System Administrator',
    department: 'Operations',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 14:30',
    permissions: ['User Management', 'System Settings', 'Analytics', 'Content Moderation']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          My Profile
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage your admin account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          padding: '32px',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              border: '3px solid rgba(255, 255, 255, 0.3)'
            }}>
              👤
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {profileData.name}
              </h2>
              <p style={{ fontSize: '16px', margin: '4px 0', opacity: 0.9 }}>
                {profileData.role}
              </p>
              <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>
                {profileData.department} • Joined {new Date(profileData.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <button
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
            onClick={() => setIsEditing(!isEditing)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            {isEditing ? '✓ Save' : '✏️ Edit'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          borderBottom: '1px solid #e5e7eb',
          padding: '0 32px'
        }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { id: 'profile', label: 'Profile Info', icon: '👤' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'permissions', label: 'Permissions', icon: '🛡️' },
              { id: 'activity', label: 'Activity Log', icon: '📊' }
            ].map(tab => (
              <button
                key={tab.id}
                style={{
                  padding: '16px 0',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                  borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                  Full Name
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: isEditing ? 'white' : '#f9fafb'
                  }}
                  value={profileData.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                  Email Address
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: isEditing ? 'white' : '#f9fafb'
                  }}
                  value={profileData.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                  Phone Number
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: isEditing ? 'white' : '#f9fafb'
                  }}
                  value={profileData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                  Department
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: isEditing ? 'white' : '#f9fafb'
                  }}
                  value={profileData.department}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                >
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                  Password & Security
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Enter current password"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Enter new password"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Confirm new password"
                  />
                </div>

                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Update Password
                </button>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                  🔒 Two-Factor Authentication
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                  Add an extra layer of security to your account
                </p>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                Admin Permissions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {profileData.permissions.map((permission, index) => (
                  <div key={index} style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <div>
                      <p style={{ fontWeight: '500', margin: 0, color: '#0c4a6e' }}>
                        {permission}
                      </p>
                      <p style={{ fontSize: '12px', color: '#0369a1', margin: '4px 0 0 0' }}>
                        Full access granted
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { action: 'Logged in', time: '2 hours ago', icon: '🔑' },
                  { action: 'Updated user permissions', time: '1 day ago', icon: '👥' },
                  { action: 'Reviewed driver advertisement', time: '2 days ago', icon: '📋' },
                  { action: 'Generated analytics report', time: '3 days ago', icon: '📊' },
                  { action: 'Modified system settings', time: '1 week ago', icon: '⚙️' }
                ].map((activity, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <span style={{ fontSize: '20px' }}>{activity.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: '500', color: '#1f2937' }}>
                        {activity.action}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

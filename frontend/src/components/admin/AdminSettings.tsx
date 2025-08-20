import React, { useState } from 'react';
import { useAuthCheck } from '../../utils/authCheck';

const AdminSettings = () => {
  const { user, isAuthorized } = useAuthCheck('admin');
  const [activeTab, setActiveTab] = useState('general');

  if (!isAuthorized) {
    return null; // Will redirect automatically
  }

  const [settings, setSettings] = useState({
    siteName: 'Logistics Workers Platform',
    siteDescription: 'Professional logistics and transportation services',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    maxFileSize: '10',
    sessionTimeout: '30',
    defaultLanguage: 'en',
    timezone: 'Europe/Vilnius',
    currency: 'EUR'
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Show success message
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          System Settings
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configure platform settings and system preferences
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
        {/* Settings Navigation */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          height: 'fit-content',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'general', label: 'General', icon: '⚙️' },
              { id: 'users', label: 'User Management', icon: '👥' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'integrations', label: 'Integrations', icon: '🔗' },
              { id: 'backup', label: 'Backup & Recovery', icon: '💾' }
            ].map(tab => (
              <button
                key={tab.id}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                  backgroundColor: activeTab === tab.id ? '#eff6ff' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  width: '100%'
                }}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ padding: '24px' }}>
            {activeTab === 'general' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  General Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                        Site Name
                      </label>
                      <input
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        value={settings.siteName}
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                        Default Language
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                        value={settings.defaultLanguage}
                        onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="lt">Lithuanian</option>
                        <option value="lv">Latvian</option>
                        <option value="et">Estonian</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                      Site Description
                    </label>
                    <textarea
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'vertical',
                        minHeight: '80px'
                      }}
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                        Timezone
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                        value={settings.timezone}
                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      >
                        <option value="Europe/Vilnius">Europe/Vilnius</option>
                        <option value="Europe/Riga">Europe/Riga</option>
                        <option value="Europe/Tallinn">Europe/Tallinn</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                        Currency
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                        value={settings.currency}
                        onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  User Management Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: '#1f2937' }}>
                        User Registration
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                        Allow new users to register on the platform
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                      <input
                        type="checkbox"
                        checked={settings.userRegistration}
                        onChange={(e) => setSettings({...settings, userRegistration: e.target.checked})}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.userRegistration ? '#3b82f6' : '#ccc',
                        transition: '0.4s',
                        borderRadius: '34px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '26px',
                          width: '26px',
                          left: settings.userRegistration ? '30px' : '4px',
                          bottom: '4px',
                          backgroundColor: 'white',
                          transition: '0.4s',
                          borderRadius: '50%'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: '#1f2937' }}>
                        Auto-approve Drivers
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                        Automatically approve driver registrations
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                      <input
                        type="checkbox"
                        checked={settings.autoApproval}
                        onChange={(e) => setSettings({...settings, autoApproval: e.target.checked})}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.autoApproval ? '#3b82f6' : '#ccc',
                        transition: '0.4s',
                        borderRadius: '34px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '26px',
                          width: '26px',
                          left: settings.autoApproval ? '30px' : '4px',
                          bottom: '4px',
                          backgroundColor: 'white',
                          transition: '0.4s',
                          borderRadius: '50%'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      style={{
                        width: '200px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  Notification Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send notifications via SMS' }
                  ].map(item => (
                    <div key={item.key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: '#1f2937' }}>
                          {item.label}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                          {item.desc}
                        </p>
                      </div>
                      <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => setSettings({...settings, [item.key]: e.target.checked})}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: (settings[item.key as keyof typeof settings] as boolean) ? '#3b82f6' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '34px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '26px',
                            width: '26px',
                            left: (settings[item.key as keyof typeof settings] as boolean) ? '30px' : '4px',
                            bottom: '4px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  Security Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>⚠️</span>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#92400e' }}>
                        Maintenance Mode
                      </h3>
                    </div>
                    <p style={{ fontSize: '14px', color: '#92400e', marginBottom: '12px' }}>
                      Enable maintenance mode to temporarily disable public access
                    </p>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#92400e' }}>
                        Enable Maintenance Mode
                      </span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
                      Maximum File Upload Size (MB)
                    </label>
                    <input
                      type="number"
                      style={{
                        width: '200px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      value={settings.maxFileSize}
                      onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  Third-party Integrations
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  {[
                    { name: 'Google Maps API', status: 'Connected', icon: '🗺️', color: '#10b981' },
                    { name: 'Payment Gateway', status: 'Not Connected', icon: '💳', color: '#ef4444' },
                    { name: 'Email Service', status: 'Connected', icon: '📧', color: '#10b981' },
                    { name: 'SMS Gateway', status: 'Not Connected', icon: '📱', color: '#ef4444' }
                  ].map(integration => (
                    <div key={integration.name} style={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{integration.icon}</span>
                        <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: '#1f2937' }}>
                          {integration.name}
                        </h3>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor: integration.status === 'Connected' ? '#dcfce7' : '#fee2e2',
                          color: integration.color,
                          fontWeight: '500'
                        }}>
                          {integration.status}
                        </span>
                        <button style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}>
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
                  Backup & Recovery
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#0c4a6e' }}>
                      💾 Automated Backups
                    </h3>
                    <p style={{ fontSize: '14px', color: '#0c4a6e', marginBottom: '12px' }}>
                      Last backup: Today at 03:00 AM
                    </p>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      Create Backup Now
                    </button>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
                      Recent Backups
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { date: '2024-01-20 03:00', size: '2.3 GB', status: 'Success' },
                        { date: '2024-01-19 03:00', size: '2.2 GB', status: 'Success' },
                        { date: '2024-01-18 03:00', size: '2.1 GB', status: 'Success' }
                      ].map((backup, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div>
                            <p style={{ margin: 0, fontWeight: '500', color: '#1f2937' }}>
                              {backup.date}
                            </p>
                            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                              Size: {backup.size}
                            </p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                              fontSize: '12px',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              fontWeight: '500'
                            }}>
                              {backup.status}
                            </span>
                            <button style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: 'white',
                              color: '#6b7280',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}>
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onClick={handleSave}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              💾 Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

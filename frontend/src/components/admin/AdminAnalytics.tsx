import React, { useState } from 'react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeMetric, setActiveMetric] = useState('overview');

  // Mock data for analytics
  const metrics = {
    totalUsers: { value: 1247, change: '+12%', trend: 'up' },
    activeDrivers: { value: 342, change: '+8%', trend: 'up' },
    totalJobs: { value: 2156, change: '+15%', trend: 'up' },
    revenue: { value: '€45,230', change: '+22%', trend: 'up' },
    completionRate: { value: '94.5%', change: '+2.1%', trend: 'up' },
    avgResponseTime: { value: '2.3h', change: '-15%', trend: 'down' }
  };

  const recentActivity = [
    { action: 'New driver registered', user: 'Jonas Petraitis', time: '5 min ago', type: 'user' },
    { action: 'Job completed', user: 'Petras Kazlauskas', time: '12 min ago', type: 'job' },
    { action: 'Advertisement approved', user: 'Admin', time: '25 min ago', type: 'admin' },
    { action: 'New client registered', user: 'UAB Logistika', time: '1 hour ago', type: 'user' },
    { action: 'Payment processed', user: 'System', time: '2 hours ago', type: 'payment' }
  ];

  const topDrivers = [
    { name: 'Petras Kazlauskas', jobs: 45, rating: 4.9, earnings: '€3,240' },
    { name: 'Jonas Petraitis', jobs: 38, rating: 4.8, earnings: '€2,890' },
    { name: 'Andrius Jankauskas', jobs: 42, rating: 4.7, earnings: '€3,120' },
    { name: 'Mindaugas Vilkas', jobs: 35, rating: 4.6, earnings: '€2,650' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'job': return '📦';
      case 'admin': return '⚙️';
      case 'payment': return '💳';
      default: return '📊';
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: '#6b7280' }}>
              Platform performance and user insights
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📊</span>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'Total Users', key: 'totalUsers', icon: '👥', color: '#3b82f6' },
          { title: 'Active Drivers', key: 'activeDrivers', icon: '🚛', color: '#10b981' },
          { title: 'Total Jobs', key: 'totalJobs', icon: '📦', color: '#f59e0b' },
          { title: 'Revenue', key: 'revenue', icon: '💰', color: '#8b5cf6' },
          { title: 'Completion Rate', key: 'completionRate', icon: '✅', color: '#06b6d4' },
          { title: 'Avg Response Time', key: 'avgResponseTime', icon: '⏱️', color: '#ef4444' }
        ].map(metric => (
          <div key={metric.key} style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: `${metric.color}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {metric.icon}
              </div>
              <span style={{
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: metrics[metric.key as keyof typeof metrics].trend === 'up' ? '#dcfce7' : '#fee2e2',
                color: metrics[metric.key as keyof typeof metrics].trend === 'up' ? '#166534' : '#dc2626',
                fontWeight: '500'
              }}>
                {metrics[metric.key as keyof typeof metrics].change}
              </span>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                {metrics[metric.key as keyof typeof metrics].value}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                {metric.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Main Analytics Content */}
        <div>
          {/* Chart Placeholder */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Platform Activity
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Users', 'Jobs', 'Revenue'].map(tab => (
                  <button
                    key={tab}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: activeMetric === tab.toLowerCase() ? '#3b82f6' : '#f3f4f6',
                      color: activeMetric === tab.toLowerCase() ? 'white' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActiveMetric(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mock Chart Area */}
            <div style={{
              height: '300px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📈</div>
                <p style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>
                  Interactive Chart Area
                </p>
                <p style={{ fontSize: '14px', margin: '4px 0 0 0' }}>
                  Chart.js or similar library would render here
                </p>
              </div>
            </div>
          </div>

          {/* Top Drivers Table */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Top Performing Drivers
              </h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Driver
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Jobs Completed
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Rating
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topDrivers.map((driver, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#dbeafe',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px'
                          }}>
                            👤
                          </div>
                          <span style={{ fontWeight: '500', color: '#1f2937' }}>
                            {driver.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#1f2937' }}>
                        {driver.jobs}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#fbbf24' }}>⭐</span>
                          <span style={{ color: '#1f2937' }}>{driver.rating}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: '#059669' }}>
                        {driver.earnings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Recent Activity
              </h2>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivity.map((activity, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                        {activity.action}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Quick Stats
              </h2>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Pending Approvals', value: '12', color: '#f59e0b' },
                  { label: 'Active Jobs', value: '89', color: '#3b82f6' },
                  { label: 'New Messages', value: '5', color: '#ef4444' },
                  { label: 'System Alerts', value: '2', color: '#8b5cf6' }
                ].map((stat, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {stat.label}
                    </span>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: stat.color,
                      backgroundColor: `${stat.color}20`,
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

import React, { useState } from 'react';
import { useAuthCheck } from '../../utils/authCheck';

const AdminDashboardDemo = () => {
  const { user, isAuthorized } = useAuthCheck('admin');
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthorized) {
    return null; // Will redirect automatically
  }

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeDrivers: 342,
    pendingApprovals: 12,
    totalRevenue: 45230,
    completedJobs: 2156,
    activeJobs: 89
  };

  const recentUsers = [
    { name: 'Jonas Petraitis', type: 'Driver', status: 'Active', joinDate: '2024-01-20' },
    { name: 'UAB Logistika', type: 'Client', status: 'Pending', joinDate: '2024-01-19' },
    { name: 'Petras Kazlauskas', type: 'Driver', status: 'Active', joinDate: '2024-01-18' }
  ];

  const pendingActions = [
    { type: 'Driver Registration', count: 5, priority: 'high' },
    { type: 'Advertisement Review', count: 7, priority: 'medium' },
    { type: 'Client Verification', count: 3, priority: 'low' },
    { type: 'Document Approval', count: 12, priority: 'high' }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>
          Welcome back! Here's what's happening on your platform today.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: '👥', color: '#3b82f6', change: '+12%' },
          { title: 'Active Drivers', value: stats.activeDrivers.toString(), icon: '🚛', color: '#10b981', change: '+8%' },
          { title: 'Pending Approvals', value: stats.pendingApprovals.toString(), icon: '⏳', color: '#f59e0b', change: '+3' },
          { title: 'Total Revenue', value: `€${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#8b5cf6', change: '+22%' },
          { title: 'Completed Jobs', value: stats.completedJobs.toLocaleString(), icon: '✅', color: '#06b6d4', change: '+15%' },
          { title: 'Active Jobs', value: stats.activeJobs.toString(), icon: '📦', color: '#ef4444', change: '-2' }
        ].map((stat, index) => (
          <div key={index} style={{
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
                backgroundColor: `${stat.color}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {stat.icon}
              </div>
              <span style={{
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: stat.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                color: stat.change.startsWith('+') ? '#166534' : '#dc2626',
                fontWeight: '500'
              }}>
                {stat.change}
              </span>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Main Content */}
        <div>
          {/* Activity Chart Placeholder */}
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
                Platform Activity Overview
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['7D', '30D', '90D'].map(period => (
                  <button
                    key={period}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: period === '30D' ? '#3b82f6' : '#f3f4f6',
                      color: period === '30D' ? 'white' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{
              height: '250px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
                <p style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>
                  Activity Chart
                </p>
                <p style={{ fontSize: '14px', margin: '4px 0 0 0' }}>
                  User registrations, job completions, revenue trends
                </p>
              </div>
            </div>
          </div>

          {/* Recent Users Table */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                  Recent User Registrations
                </h2>
                <button style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  View All
                </button>
              </div>
            </div>
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      User
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Type
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Status
                    </th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, index) => (
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
                            {user.type === 'Driver' ? '🚛' : '🏢'}
                          </div>
                          <span style={{ fontWeight: '500', color: '#1f2937' }}>
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#6b7280' }}>
                        {user.type}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor: user.status === 'Active' ? '#dcfce7' : '#fef3c7',
                          color: user.status === 'Active' ? '#166534' : '#92400e',
                          fontWeight: '500'
                        }}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#6b7280' }}>
                        {new Date(user.joinDate).toLocaleDateString()}
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
          {/* Pending Actions */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Pending Actions
              </h2>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingActions.map((action, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                        {action.type}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          backgroundColor: action.priority === 'high' ? '#fee2e2' : action.priority === 'medium' ? '#fef3c7' : '#f0f9ff',
                          color: action.priority === 'high' ? '#dc2626' : action.priority === 'medium' ? '#d97706' : '#2563eb',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {action.priority}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: action.priority === 'high' ? '#dc2626' : '#3b82f6',
                      backgroundColor: action.priority === 'high' ? '#fee2e2' : '#eff6ff',
                      padding: '8px 12px',
                      borderRadius: '12px'
                    }}>
                      {action.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Quick Actions
              </h2>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Review Advertisements', icon: '📋', color: '#3b82f6' },
                  { label: 'Manage Users', icon: '👥', color: '#10b981' },
                  { label: 'System Settings', icon: '⚙️', color: '#6b7280' },
                  { label: 'Generate Report', icon: '📊', color: '#8b5cf6' }
                ].map((action, index) => (
                  <button
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'transparent',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937',
                      width: '100%',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                System Status
              </h2>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Server Status', status: 'Online', color: '#10b981' },
                  { label: 'Database', status: 'Healthy', color: '#10b981' },
                  { label: 'API Response', status: '125ms', color: '#10b981' },
                  { label: 'Last Backup', status: '2h ago', color: '#6b7280' }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: item.color
                    }}>
                      {item.status}
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

export default AdminDashboardDemo;

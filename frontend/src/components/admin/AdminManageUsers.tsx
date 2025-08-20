import React, { useState } from 'react';

const AdminManageUsers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Jonas Petraitis',
      email: 'jonas.petraitis@email.com',
      role: 'driver',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      completedJobs: 45,
      rating: 4.8,
      phone: '+370 600 12345',
      location: 'Vilnius'
    },
    {
      id: 2,
      name: 'UAB Logistika',
      email: 'info@logistika.lt',
      role: 'client',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '1 day ago',
      completedJobs: 23,
      rating: 4.9,
      phone: '+370 700 54321',
      location: 'Kaunas'
    },
    {
      id: 3,
      name: 'Petras Kazlauskas',
      email: 'petras.k@email.com',
      role: 'driver',
      status: 'pending',
      joinDate: '2024-01-20',
      lastActive: '5 hours ago',
      completedJobs: 0,
      rating: 0,
      phone: '+370 650 98765',
      location: 'Klaipėda'
    },
    {
      id: 4,
      name: 'Admin User',
      email: 'admin@platform.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: 'Online now',
      completedJobs: 0,
      rating: 0,
      phone: '+370 600 00000',
      location: 'Vilnius'
    },
    {
      id: 5,
      name: 'Andrius Jankauskas',
      email: 'andrius.j@email.com',
      role: 'driver',
      status: 'suspended',
      joinDate: '2024-01-05',
      lastActive: '1 week ago',
      completedJobs: 12,
      rating: 3.2,
      phone: '+370 680 11111',
      location: 'Šiauliai'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'driver': return '🚛';
      case 'client': return '🏢';
      case 'admin': return '👑';
      default: return '👤';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: '#dcfce7', color: '#166534' };
      case 'pending': return { bg: '#fef3c7', color: '#92400e' };
      case 'suspended': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
              User Management
            </h1>
            <p style={{ color: '#6b7280' }}>
              Manage drivers, clients, and admin users
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>➕</span>
              Add User
            </button>
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
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { key: 'all', label: 'All Users', count: users.length },
              { key: 'driver', label: 'Drivers', count: users.filter(u => u.role === 'driver').length },
              { key: 'client', label: 'Clients', count: users.filter(u => u.role === 'client').length },
              { key: 'admin', label: 'Admins', count: users.filter(u => u.role === 'admin').length },
              { key: 'pending', label: 'Pending', count: users.filter(u => u.status === 'pending').length }
            ].map(tab => (
              <button
                key={tab.key}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: activeTab === tab.key ? '#3b82f6' : '#f3f4f6',
                  color: activeTab === tab.key ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                <span style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                  borderRadius: '10px'
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search users..."
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                width: '250px'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={{
              padding: '8px 12px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              🔍
            </button>
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', color: '#1e40af', fontWeight: '500' }}>
              {selectedUsers.length} user(s) selected
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Activate
              </button>
              <button style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Suspend
              </button>
              <button style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '16px 24px', textAlign: 'left' }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  style={{ width: '16px', height: '16px' }}
                />
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                User
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                Role
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                Status
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                Performance
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                Last Active
              </th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const statusStyle = getStatusColor(user.status);
              return (
                <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      style={{ width: '16px', height: '16px' }}
                    />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                          {user.name}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                          {user.email}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                          📍 {user.location} • 📞 {user.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: user.role === 'admin' ? '#fef3c7' : user.role === 'driver' ? '#dbeafe' : '#f0fdf4',
                      color: user.role === 'admin' ? '#92400e' : user.role === 'driver' ? '#1e40af' : '#166534',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {user.role !== 'admin' ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                            {user.completedJobs}
                          </span>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>jobs</span>
                        </div>
                        {user.rating > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: '#fbbf24' }}>⭐</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>{user.rating}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>N/A</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                        {user.lastActive}
                      </p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        👁️ View
                      </button>
                      <button style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        ✏️ Edit
                      </button>
                      <button style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0, marginBottom: '8px' }}>
              No users found
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px',
          padding: '16px 0'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '8px 12px',
              fontSize: '14px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Previous
            </button>
            <button style={{
              padding: '8px 12px',
              fontSize: '14px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              1
            </button>
            <button style={{
              padding: '8px 12px',
              fontSize: '14px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsers;

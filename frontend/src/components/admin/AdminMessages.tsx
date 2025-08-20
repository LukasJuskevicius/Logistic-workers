import React, { useState } from 'react';

const AdminMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      participant: 'Jonas Petraitis',
      role: 'Driver',
      lastMessage: 'When will my advertisement be approved?',
      timestamp: '10:30 AM',
      unread: true,
      priority: 'medium',
      status: 'open',
      messages: [
        { sender: 'Jonas Petraitis', content: 'Hello, I submitted my driver advertisement 3 days ago. When will it be reviewed?', timestamp: '9:15 AM', isAdmin: false },
        { sender: 'Admin', content: 'Hi Jonas! Thank you for your inquiry. We typically review advertisements within 2-3 business days.', timestamp: '9:45 AM', isAdmin: true },
        { sender: 'Jonas Petraitis', content: 'When will my advertisement be approved?', timestamp: '10:30 AM', isAdmin: false }
      ]
    },
    {
      id: 2,
      participant: 'UAB Logistika',
      role: 'Client',
      lastMessage: 'We need urgent delivery services',
      timestamp: 'Yesterday',
      unread: false,
      priority: 'high',
      status: 'resolved',
      messages: [
        { sender: 'UAB Logistika', content: 'We need urgent delivery services for tomorrow. Can you help us find available drivers?', timestamp: 'Yesterday 2:30 PM', isAdmin: false },
        { sender: 'Admin', content: 'Absolutely! I\'ve forwarded your request to our available drivers. You should receive responses within the hour.', timestamp: 'Yesterday 2:45 PM', isAdmin: true },
        { sender: 'UAB Logistika', content: 'Perfect, thank you for the quick response!', timestamp: 'Yesterday 3:15 PM', isAdmin: false }
      ]
    },
    {
      id: 3,
      participant: 'Petras Kazlauskas',
      role: 'Driver',
      lastMessage: 'Payment issue with last job',
      timestamp: '2 days ago',
      unread: false,
      priority: 'high',
      status: 'pending',
      messages: [
        { sender: 'Petras Kazlauskas', content: 'I completed a job last week but haven\'t received payment yet. Can you check the status?', timestamp: '2 days ago 11:00 AM', isAdmin: false },
        { sender: 'Admin', content: 'Let me check your payment status. Can you provide the job ID?', timestamp: '2 days ago 11:15 AM', isAdmin: true },
        { sender: 'Petras Kazlauskas', content: 'Payment issue with last job', timestamp: '2 days ago 11:30 AM', isAdmin: false }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'unread') return conv.unread;
    return conv.status === filterStatus;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
          Messages & Support
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage user communications and support requests
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: '700px' }}>
        {/* Conversations List */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Conversations Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                Conversations
              </h2>
              <span style={{
                fontSize: '12px',
                padding: '4px 8px',
                backgroundColor: '#eff6ff',
                color: '#3b82f6',
                borderRadius: '12px',
                fontWeight: '500'
              }}>
                {conversations.filter(c => c.unread).length} unread
              </span>
            </div>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'open', label: 'Open' },
                { key: 'pending', label: 'Pending' }
              ].map(filter => (
                <button
                  key={filter.key}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: filterStatus === filter.key ? '#3b82f6' : '#f3f4f6',
                    color: filterStatus === filter.key ? 'white' : '#6b7280',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setFilterStatus(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  backgroundColor: selectedConversation === index ? '#f0f9ff' : 'transparent'
                }}
                onClick={() => setSelectedConversation(index)}
                onMouseEnter={(e) => {
                  if (selectedConversation !== index) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedConversation !== index) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: conversation.role === 'Driver' ? '#dbeafe' : '#fef3c7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}>
                      {conversation.role === 'Driver' ? '🚛' : '🏢'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <p style={{ margin: 0, fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                          {conversation.participant}
                        </p>
                        {conversation.unread && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#3b82f6',
                            borderRadius: '50%'
                          }}></div>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                        {conversation.role}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>
                      {conversation.timestamp}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{
                        fontSize: '8px',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        backgroundColor: `${getPriorityColor(conversation.priority)}20`,
                        color: getPriorityColor(conversation.priority),
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {conversation.priority}
                      </span>
                      <span style={{
                        fontSize: '8px',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        backgroundColor: `${getStatusColor(conversation.status)}20`,
                        color: getStatusColor(conversation.status),
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {conversation.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#6b7280',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {conversation.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {filteredConversations.length > 0 ? (
            <>
              {/* Chat Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: filteredConversations[selectedConversation].role === 'Driver' ? '#dbeafe' : '#fef3c7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}>
                      {filteredConversations[selectedConversation].role === 'Driver' ? '🚛' : '🏢'}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                        {filteredConversations[selectedConversation].participant}
                      </h3>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                        {filteredConversations[selectedConversation].role}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      📋 View Profile
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      ✅ Mark Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredConversations[selectedConversation].messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: message.isAdmin ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        maxWidth: '70%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: message.isAdmin ? '#3b82f6' : 'white',
                        color: message.isAdmin ? 'white' : '#1f2937',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                          {message.content}
                        </p>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '8px'
                        }}>
                          <span style={{
                            fontSize: '11px',
                            opacity: 0.7,
                            fontWeight: '500'
                          }}>
                            {message.sender}
                          </span>
                          <span style={{
                            fontSize: '11px',
                            opacity: 0.7
                          }}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div style={{ padding: '20px 24px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <textarea
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'none',
                        minHeight: '80px',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    style={{
                      padding: '12px 20px',
                      backgroundColor: newMessage.trim() ? '#3b82f6' : '#d1d5db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <span>📤</span>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0, marginBottom: '8px' }}>
                No conversations found
              </h3>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;

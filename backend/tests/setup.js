import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  // Setup test database or mock services
  console.log('🧪 Test environment initialized');
});

afterAll(async () => {
  // Cleanup test data
  console.log('🧹 Test environment cleaned up');
});

// Global test utilities
global.testUtils = {
  // Helper to create test users
  createTestUser: (userData = {}) => ({
    email: `test-${Date.now()}@example.com`,
    password: 'TestPass123',
    firstName: 'Test',
    lastName: 'User',
    type: 'driver',
    ...userData
  }),

  // Helper to create test vacancy
  createTestVacancy: (vacancyData = {}) => ({
    title: 'Test Driver Position',
    company: 'Test Company',
    location: 'Test Location',
    salary: '€3,000/month',
    type: 'Full-time',
    requirements: ['CE License', '2+ years experience'],
    description: 'Test job description',
    status: 'active',
    deadline: '2024-12-31',
    ...vacancyData
  }),

  // Helper to create test contact message
  createTestContactMessage: (messageData = {}) => ({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message content',
    ...messageData
  })
}; 
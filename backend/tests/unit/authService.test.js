import { AuthService } from '../../src/services/authService.js';
import { supabase } from '../../src/config/supabase.js';

// Mock Supabase
jest.mock('../../src/config/supabase.js');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        email_confirmed_at: '2024-01-01T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      const mockSession = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token'
      };

      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        type: 'driver',
        first_name: 'Test',
        last_name: 'User'
      };

      // Mock Supabase auth
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null
      });

      // Mock profile fetch
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          })
        })
      });

      const result = await AuthService.login('test@example.com', 'password');

      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('test@example.com');
      expect(result.data.user.type).toBe('driver');
    });

    it('should handle login failure', async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' }
      });

      const result = await AuthService.login('test@example.com', 'wrong-password');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser = {
        id: 'new-user-id',
        email: 'new@example.com'
      };

      const userData = {
        email: 'new@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
        type: 'driver'
      };

      // Mock Supabase auth
      supabase.auth.admin.createUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      // Mock profile creation
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { ...mockUser, ...userData },
              error: null
            })
          })
        })
      });

      const result = await AuthService.register(userData, 'driver');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Registration successful');
    });
  });

  describe('logout', () => {
    it('should successfully logout a user', async () => {
      supabase.auth.signOut.mockResolvedValue({
        error: null
      });

      const result = await AuthService.logout();

      expect(result.success).toBe(true);
      expect(result.message).toBe('Logged out successfully');
    });
  });
}); 
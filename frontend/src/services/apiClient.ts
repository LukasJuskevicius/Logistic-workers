// Centralized API client for all backend communication

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:54321/functions/v1';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface AuthData {
  user: any;
  session: {
    access_token: string;
    refresh_token: string;
  };
}

class ApiClient {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const session = localStorage.getItem('logistic_workers_session');
    if (session) {
      try {
        const { session: sessionData } = JSON.parse(session);
        if (sessionData?.access_token) {
          (defaultHeaders as any)['Authorization'] = `Bearer ${sessionData.access_token}`;
        }
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication endpoints
  auth = {
    login: (email: string, password: string) =>
      this.makeRequest<AuthData>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    logout: () =>
      this.makeRequest('/auth/logout', {
        method: 'POST',
      }),

    registerClient: (clientData: any) =>
      this.makeRequest('/auth/register/client', {
        method: 'POST',
        body: JSON.stringify(clientData),
      }),

    registerDriver: (driverData: any) =>
      this.makeRequest('/auth/register/driver', {
        method: 'POST',
        body: JSON.stringify(driverData),
      }),
  };

  // Driver endpoints
  drivers = {
    submitApplication: (applicationData: any) =>
      this.makeRequest('/driver/application', {
        method: 'POST',
        body: JSON.stringify(applicationData),
      }),

    getProfile: () =>
      this.makeRequest('/driver/profile'),

    updateProfile: (profileData: any) =>
      this.makeRequest('/driver/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  };

  // Client endpoints
  clients = {
    submitJobRequest: (jobData: any) =>
      this.makeRequest('/client/job-request', {
        method: 'POST',
        body: JSON.stringify(jobData),
      }),

    getJobRequests: () =>
      this.makeRequest('/client/job-requests'),

    getProfile: () =>
      this.makeRequest('/client/profile'),
  };

  // Public endpoints
  public = {
    getVacancies: () =>
      this.makeRequest('/vacancies'),

    getTestimonials: () =>
      this.makeRequest('/testimonials'),

    submitContact: (contactData: any) =>
      this.makeRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
      }),
  };

  // Admin endpoints
  admin = {
    getUsers: () =>
      this.makeRequest('/admin/users'),

    getUserById: (userId: string) =>
      this.makeRequest(`/admin/users/${userId}`),

    updateUserStatus: (userId: string, status: string) =>
      this.makeRequest(`/admin/users/${userId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),

    getApplications: () =>
      this.makeRequest('/admin/applications'),

    updateApplication: (applicationId: string, action: string) =>
      this.makeRequest(`/admin/applications/${applicationId}`, {
        method: 'PUT',
        body: JSON.stringify({ action }),
      }),
  };
}

export const apiClient = new ApiClient();

// For backward compatibility with existing code
export const api = {
  signIn: apiClient.auth.login,
  signOut: apiClient.auth.logout,
  registerClient: apiClient.auth.registerClient,
  registerDriver: apiClient.auth.registerDriver,
  submitDriverApplication: apiClient.drivers.submitApplication,
  submitJobRequest: apiClient.clients.submitJobRequest,
  submitContactForm: apiClient.public.submitContact,
  getVacancies: apiClient.public.getVacancies,
  getTestimonials: apiClient.public.getTestimonials,
};
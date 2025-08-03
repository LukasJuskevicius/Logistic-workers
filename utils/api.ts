import { projectId, publicAnonKey } from './supabase/info';
import { supabase } from './supabase/client';

class ApiService {
  private baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb`;

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`API Error (${response.status}):`, data);
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`Network error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication methods
  async signIn(email: string, password: string) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signOut(accessToken?: string) {
    const headers: any = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return this.makeRequest('/auth/logout', {
      method: 'POST',
      headers,
    });
  }

  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Get session error:', error);
        return null;
      }
      return data.session;
    } catch (error) {
      console.error('Get session network error:', error);
      return null;
    }
  }

  // Registration methods
  async registerClient(clientData: any) {
    return this.makeRequest('/register/client', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  async registerDriver(driverData: any) {
    return this.makeRequest('/register/driver', {
      method: 'POST',
      body: JSON.stringify(driverData),
    });
  }

  // Application methods
  async submitDriverApplication(applicationData: any) {
    return this.makeRequest('/driver/application', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async submitJobRequest(jobData: any) {
    return this.makeRequest('/client/job-request', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  // Contact method
  async submitContactForm(contactData: any) {
    return this.makeRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.makeRequest('/testimonials');
  }

  async submitTestimonial(testimonialData: any, accessToken: string) {
    return this.makeRequest('/testimonial', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(testimonialData),
    });
  }

  // Profile methods
  async getUserProfile(accessToken: string) {
    return this.makeRequest('/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // Generic method for API requests (used by admin dashboard)
  async makeApiRequest(endpoint: string, options: RequestInit = {}) {
    return this.makeRequest(endpoint, options);
  }
}

export const api = new ApiService();
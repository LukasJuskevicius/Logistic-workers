import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Singleton Supabase client instance
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Re-export API functions from the main API service to maintain compatibility
export { api } from '../api';

// API base URL (kept for backward compatibility)
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-8675f3cb`;

// Helper function to make authenticated API calls (kept for backward compatibility)
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': session?.access_token ? `Bearer ${session.access_token}` : `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Authentication functions (kept for backward compatibility)
export const auth = {
  supabase,
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};
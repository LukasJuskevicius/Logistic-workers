// Core type definitions

export type UserType = 'admin' | 'driver' | 'client';
export type UserStatus = 'pending' | 'active' | 'suspended' | 'blocked';

export interface BaseUser {
  id: string;
  email: string;
  type: UserType;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface AdminUser extends BaseUser {
  type: 'admin';
  name: string;
  role: 'administrator' | 'moderator';
  permissions?: string[];
}

export interface DriverUser extends BaseUser {
  type: 'driver';
  full_name: string;
  phone: string;
  nationality?: string;
  profile_complete: boolean;
  license_number?: string;
  license_categories: string[];
  experience_years?: number;
  languages?: Record<string, string>;
  preferred_routes?: string;
  availability?: string;
  certifications?: string[];
}

export interface ClientUser extends BaseUser {
  type: 'client';
  company_name: string;
  registration_number?: string;
  contact_name: string;
  phone: string;
  address?: string;
  business_type?: string;
}

export type User = AdminUser | DriverUser | ClientUser;

// Application types
export interface Application {
  id: string;
  user_id: string;
  type: 'driver' | 'job';
  status: 'pending' | 'approved' | 'rejected';
  data: any;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

// Job types
export interface Job {
  id: string;
  client_id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  status: 'active' | 'closed' | 'paused';
  created_at: string;
  expires_at?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}
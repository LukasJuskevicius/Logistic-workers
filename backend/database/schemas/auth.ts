import { z } from 'npm:zod@3.22.4';

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Base registration schema
const baseRegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Client registration schema
export const clientRegisterSchema = baseRegisterSchema.extend({
  companyName: z.string().min(1, 'Company name is required'),
  registrationNumber: z.string().optional(),
  contactName: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().optional(),
  businessType: z.string().optional(),
});

// Driver registration schema
export const driverRegisterSchema = baseRegisterSchema.extend({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  nationality: z.string().optional(),
  licenseNumber: z.string().optional(),
  licenseCategories: z.array(z.string()).optional(),
  experience: z.string().optional(),
  languages: z.record(z.string()).optional(),
  preferredRoutes: z.string().optional(),
  availability: z.string().optional(),
  certifications: z.string().optional(),
});

// User profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
}).catchall(z.any()); // Allow additional fields

export type LoginInput = z.infer<typeof loginSchema>;
export type ClientRegisterInput = z.infer<typeof clientRegisterSchema>;
export type DriverRegisterInput = z.infer<typeof driverRegisterSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
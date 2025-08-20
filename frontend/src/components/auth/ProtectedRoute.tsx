import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const userData = useLoaderData() as { user: any };
  const user = userData?.user;

  console.log('🔐 ProtectedRoute check:', { user, requiredRole });

  // If no user is authenticated, redirect to login
  if (!user) {
    console.log('❌ No user found, redirecting to login');
    return <Navigate to={redirectTo} replace />;
  }

  // If a specific role is required and user doesn't have it, redirect to home
  if (requiredRole && user.role !== requiredRole) {
    console.log('❌ User role mismatch:', user.role, 'required:', requiredRole);
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted');
  // If user is authenticated and has required role, render the protected content
  return <>{children}</>;
}

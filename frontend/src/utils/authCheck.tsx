import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  user: any;
}

export function useAuthCheck(requiredRole?: string) {
  const { user } = useOutletContext<OutletContext>();

  // Redirect to login if not authenticated
  if (!user) {
    window.location.href = '/login';
    return { user: null, isAuthorized: false };
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    window.location.href = '/';
    return { user, isAuthorized: false };
  }

  return { user, isAuthorized: true };
}

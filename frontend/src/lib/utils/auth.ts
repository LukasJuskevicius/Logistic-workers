import { redirect } from 'react-router-dom';

// Function to refresh the auth state
export async function refreshAuthState() {
  try {
    // Force a hard refresh to get the latest auth state
    window.location.reload();
  } catch (error) {
    console.error('Failed to refresh auth state:', error);
  }
}

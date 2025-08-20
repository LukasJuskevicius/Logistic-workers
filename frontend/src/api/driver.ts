// API Base URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface UpdateDriverProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  nationality?: string;
  license_type?: string;
  license_number?: string;
  license_expiry_date?: string;
  experience_years?: number;
  preferred_job_types?: string[];
  is_available?: boolean;
}

export async function updateDriverProfile(userId: string, data: UpdateDriverProfileData) {
  const response = await fetch(`${BASE_URL}/drivers/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
}

export async function uploadDriverDocument(userId: string, file: File) {
  const formData = new FormData();
  formData.append('document', file);

  const response = await fetch(`${BASE_URL}/drivers/${userId}/documents`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  return response.json();
}

export async function getDriverDocuments(userId: string) {
  const response = await fetch(`${BASE_URL}/drivers/${userId}/documents`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  return response.json();
}

export async function deleteDriverDocument(userId: string, documentId: string) {
  const response = await fetch(`${BASE_URL}/drivers/${userId}/documents/${documentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete document');
  }

  return response.json();
}

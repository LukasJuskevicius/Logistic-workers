const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error || `HTTP ${res.status}`);
  }
  return res.json();
}

export interface AdminStats {
  total_users: string;
  total_drivers: string;
  total_clients: string;
  total_messages: string;
  unread_messages: string;
}

export interface AdminUser {
  user_id: number;
  email: string;
  role: 'driver' | 'client' | 'admin';
  is_verified: boolean;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture?: string | null;
  location?: string | null;
}

export interface AdminMessage {
  message_id: number;
  sender_id: number;
  receiver_id: number | null;
  subject: string;
  content: string;
  is_admin_message: boolean;
  is_read: boolean;
  created_at: string;
  sender_email: string;
  receiver_email: string | null;
}

export const adminApi = {
  getStats: () => apiFetch<AdminStats>('/api/admin/stats'),
  getUsers: () => apiFetch<AdminUser[]>('/api/admin/users'),
  getMessages: () => apiFetch<AdminMessage[]>('/api/admin/messages'),
  updateUserStatus: (userId: number, status: 'active' | 'suspended') =>
    apiFetch(`/api/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  deleteUser: (userId: number) =>
    apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' }),
  sendMessage: (data: { receiver_id: number; subject: string; content: string }) =>
    apiFetch('/api/messages', { method: 'POST', body: JSON.stringify(data) }),
  markMessageRead: (messageId: number) =>
    apiFetch(`/api/messages/${messageId}/read`, { method: 'PUT' }),
};

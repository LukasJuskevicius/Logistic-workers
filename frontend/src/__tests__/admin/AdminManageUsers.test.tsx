import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminManageUsers from '../../components/admin/AdminManageUsers';

const { mockGetUsers, mockUpdateStatus, mockDeleteUser } = vi.hoisted(() => ({
  mockGetUsers:    vi.fn(),
  mockUpdateStatus: vi.fn(),
  mockDeleteUser:  vi.fn(),
}));

vi.mock('../../api/admin', () => ({
  adminApi: {
    getUsers:         mockGetUsers,
    updateUserStatus: mockUpdateStatus,
    deleteUser:       mockDeleteUser,
  },
}));

const mockUsers = [
  { user_id: 1, email: 'jonas@test.com',   role: 'driver', is_verified: true,  created_at: '2024-01-10T00:00:00Z', first_name: 'Jonas',   last_name: 'Petraitis' },
  { user_id: 2, email: 'uab@test.com',     role: 'client', is_verified: true,  created_at: '2024-01-11T00:00:00Z', first_name: null,      last_name: null },
  { user_id: 3, email: 'petras@test.com',  role: 'driver', is_verified: false, created_at: '2024-01-12T00:00:00Z', first_name: 'Petras',  last_name: 'K' },
  { user_id: 4, email: 'admin@test.com',   role: 'admin',  is_verified: true,  created_at: '2023-12-01T00:00:00Z', first_name: 'Admin',   last_name: 'User' },
  { user_id: 5, email: 'andrius@test.com', role: 'driver', is_verified: true,  created_at: '2024-01-05T00:00:00Z', first_name: 'Andrius', last_name: 'J' },
];

beforeEach(() => {
  mockGetUsers.mockResolvedValue(mockUsers);
  mockUpdateStatus.mockResolvedValue({});
  mockDeleteUser.mockResolvedValue({});
});

describe('AdminManageUsers', () => {
  it('shows loading state initially', () => {
    render(<AdminManageUsers />);
    expect(screen.getByText('Loading users…')).toBeInTheDocument();
  });

  it('renders all 5 users after load', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    expect(screen.getByText('Petras K')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('Andrius J')).toBeInTheDocument();
  });

  it('shows email as name when user has no first/last name', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getAllByText('uab@test.com'));
    expect(screen.getAllByText('uab@test.com').length).toBeGreaterThan(0);
  });

  it('filters to drivers only', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByText(/Drivers/)[0]);
    expect(screen.getByText('Jonas Petraitis')).toBeInTheDocument();
    expect(screen.getByText('Petras K')).toBeInTheDocument();
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
  });

  it('filters to clients only', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByText(/Clients/)[0]);
    // uab@test.com is the only client — it appears as name + email subtitle
    expect(screen.getAllByText('uab@test.com').length).toBeGreaterThan(0);
    expect(screen.queryByText('Jonas Petraitis')).not.toBeInTheDocument();
  });

  it('filters to admins only', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByText(/Admins/)[0]);
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.queryByText('Jonas Petraitis')).not.toBeInTheDocument();
  });

  it('filters to unverified only', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    // "Unverified" appears in both the tab button and status badges — click the first (tab)
    await userEvent.click(screen.getAllByText(/Unverified/)[0]);
    expect(screen.getByText('Petras K')).toBeInTheDocument();
    expect(screen.queryByText('Jonas Petraitis')).not.toBeInTheDocument();
  });

  it('search by name filters results', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.type(screen.getByPlaceholderText('Search users...'), 'Jonas');
    expect(screen.getByText('Jonas Petraitis')).toBeInTheDocument();
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
  });

  it('search with no match shows No users found', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.type(screen.getByPlaceholderText('Search users...'), 'xxxxnotfound');
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('selecting a user shows bulk actions bar', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(screen.getByText(/1 user\(s\) selected/)).toBeInTheDocument();
  });

  it('select-all selects all visible users', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getByText(/5 user\(s\) selected/)).toBeInTheDocument();
  });

  it('Suspend button calls updateUserStatus with "suspended"', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Jonas Petraitis'));
    await userEvent.click(screen.getAllByText('Suspend')[0]);
    expect(mockUpdateStatus).toHaveBeenCalledWith(1, 'suspended');
  });

  it('Activate button calls updateUserStatus with "active"', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText('Petras K'));
    await userEvent.click(screen.getByText('Activate'));
    expect(mockUpdateStatus).toHaveBeenCalledWith(3, 'active');
  });

  it('shows count in footer', async () => {
    render(<AdminManageUsers />);
    await waitFor(() => screen.getByText(/Showing 5 of 5 users/));
  });
});

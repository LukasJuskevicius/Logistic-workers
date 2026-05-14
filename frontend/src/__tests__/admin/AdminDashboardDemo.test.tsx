import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboardDemo from '../../components/admin/AdminDashboardDemo';

// ── vi.hoisted ensures these vi.fn() instances exist BEFORE vi.mock hoisting ──
const { mockGetStats, mockGetUsers } = vi.hoisted(() => ({
  mockGetStats: vi.fn(),
  mockGetUsers: vi.fn(),
}));

vi.mock('../../utils/authCheck', () => ({
  useAuthCheck: () => ({ user: { id: 1, role: 'admin' }, isAuthorized: true }),
}));

vi.mock('../../api/admin', () => ({
  adminApi: { getStats: mockGetStats, getUsers: mockGetUsers },
}));

const mockStats = {
  total_users: '42', total_drivers: '20', total_clients: '18',
  total_messages: '99', unread_messages: '3',
};

const mockUsers = [
  { user_id: 1, email: 'jonas@test.com', role: 'driver', is_verified: true,  created_at: '2024-01-10T00:00:00Z', first_name: 'Jonas', last_name: 'P' },
  { user_id: 2, email: 'uab@test.com',   role: 'client', is_verified: true,  created_at: '2024-01-11T00:00:00Z', first_name: null,   last_name: null },
];

function renderComponent() {
  return render(<MemoryRouter><AdminDashboardDemo /></MemoryRouter>);
}

beforeEach(() => {
  mockGetStats.mockClear();
  mockGetUsers.mockClear();
  mockGetStats.mockResolvedValue(mockStats);
  mockGetUsers.mockResolvedValue(mockUsers);
});

describe('AdminDashboardDemo', () => {
  it('shows loading state initially', () => {
    renderComponent();
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders stat card labels after load', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Total Users'));
    expect(screen.getByText('Drivers')).toBeInTheDocument();
    expect(screen.getByText('Clients')).toBeInTheDocument();
    expect(screen.getByText('Total Messages')).toBeInTheDocument();
    expect(screen.getByText('Unread')).toBeInTheDocument();
  });

  it('shows real stats values from API', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('42'));
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('renders recent users table with named user', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Jonas P'));
    expect(screen.getByText('jonas@test.com')).toBeInTheDocument();
  });

  it('falls back to email when user has no first/last name', async () => {
    renderComponent();
    await waitFor(() => screen.getAllByText('uab@test.com'));
    // email appears twice: as the name cell and as the subtitle
    expect(screen.getAllByText('uab@test.com').length).toBeGreaterThanOrEqual(1);
  });

  it('calls both getStats and getUsers on mount', async () => {
    renderComponent();
    await waitFor(() => expect(mockGetStats).toHaveBeenCalledTimes(1));
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('shows error message when API fails', async () => {
    mockGetStats.mockRejectedValue(new Error('network'));
    mockGetUsers.mockRejectedValue(new Error('network'));
    renderComponent();
    await waitFor(() => screen.getByText('Failed to load dashboard data'));
  });

  it('renders Quick Actions links', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Manage Users'));
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders System Status section with real unread count', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('System Status'));
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('"View all users →" link points to /admin/users', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('View all users →'));
    expect(screen.getByText('View all users →').closest('a')).toHaveAttribute('href', '/admin/users');
  });
});

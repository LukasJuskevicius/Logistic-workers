import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminMessages from '../../components/admin/AdminMessages';

const { mockGetMessages, mockSendMessage, mockMarkRead } = vi.hoisted(() => ({
  mockGetMessages: vi.fn(),
  mockSendMessage: vi.fn(),
  mockMarkRead:    vi.fn(),
}));

vi.mock('../../api/admin', () => ({
  adminApi: {
    getMessages:     mockGetMessages,
    sendMessage:     mockSendMessage,
    markMessageRead: mockMarkRead,
  },
}));

const mockMessages = [
  {
    message_id: 1, sender_id: 2, receiver_id: null,
    subject: 'Advertisement review',
    content: 'When will my advertisement be approved?',
    is_admin_message: false, is_read: false,
    created_at: '2024-01-15T10:30:00Z',
    sender_email: 'jonas@test.com', receiver_email: null,
  },
  {
    message_id: 2, sender_id: 3, receiver_id: null,
    subject: 'Urgent delivery',
    content: 'We need urgent delivery services',
    is_admin_message: false, is_read: true,
    created_at: '2024-01-14T14:30:00Z',
    sender_email: 'uab@test.com', receiver_email: null,
  },
  {
    message_id: 3, sender_id: 4, receiver_id: null,
    subject: 'Payment issue',
    content: 'Payment issue with last job',
    is_admin_message: false, is_read: true,
    created_at: '2024-01-13T11:00:00Z',
    sender_email: 'petras@test.com', receiver_email: null,
  },
];

beforeEach(() => {
  mockGetMessages.mockClear();
  mockSendMessage.mockClear();
  mockMarkRead.mockClear();
  mockGetMessages.mockResolvedValue(mockMessages);
  mockSendMessage.mockResolvedValue({});
  mockMarkRead.mockResolvedValue({});
});

// Helper: assert text appears ≥ 1 time (same text in list + chat area is expected)
function expectVisible(text: string) {
  expect(screen.getAllByText(text).length).toBeGreaterThan(0);
}

describe('AdminMessages', () => {
  it('renders without crashing', () => {
    render(<AdminMessages />);
    expect(screen.getByText('Messages & Support')).toBeInTheDocument();
  });

  it('renders 3 conversation threads after load', async () => {
    render(<AdminMessages />);
    // Each thread email appears in the list; jonas also appears in chat header
    await waitFor(() => expectVisible('jonas@test.com'));
    expectVisible('uab@test.com');
    expectVisible('petras@test.com');
  });

  it('shows 1 unread badge', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByText('1 unread'));
  });

  it('shows filter tabs: all, unread, admin', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByText('all'));
    expect(screen.getByText('unread')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('filter "unread" keeps only jonas thread', async () => {
    render(<AdminMessages />);
    await waitFor(() => expectVisible('jonas@test.com'));
    await userEvent.click(screen.getByText('unread'));
    // jonas appears (list + chat), others are gone entirely
    expectVisible('jonas@test.com');
    expect(screen.queryAllByText('uab@test.com')).toHaveLength(0);
    expect(screen.queryAllByText('petras@test.com')).toHaveLength(0);
  });

  it('filter "all" shows all threads again', async () => {
    render(<AdminMessages />);
    await waitFor(() => expectVisible('jonas@test.com'));
    await userEvent.click(screen.getByText('unread'));
    await userEvent.click(screen.getByText('all'));
    expectVisible('jonas@test.com');
    expectVisible('uab@test.com');
    expectVisible('petras@test.com');
  });

  it('shows first thread message content in chat by default', async () => {
    render(<AdminMessages />);
    // "When will my advertisement be approved?" appears in list preview AND chat area
    await waitFor(() => expectVisible('When will my advertisement be approved?'));
  });

  it('clicking uab thread shows its message in chat', async () => {
    render(<AdminMessages />);
    await waitFor(() => expectVisible('jonas@test.com'));
    // Click the thread list entry for uab (appears only in list before we click)
    const uabEntries = screen.getAllByText('uab@test.com');
    await userEvent.click(uabEntries[0]);
    await waitFor(() => expectVisible('We need urgent delivery services'));
  });

  it('send button is disabled with empty textarea', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByPlaceholderText('Type your message…'));
    expect(screen.getByText('Send').closest('button')).toBeDisabled();
  });

  it('send button enables after typing', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByPlaceholderText('Type your message…'));
    await userEvent.type(screen.getByPlaceholderText('Type your message…'), 'Hello');
    expect(screen.getByText('Send').closest('button')).not.toBeDisabled();
  });

  it('clicking send clears the textarea', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByPlaceholderText('Type your message…'));
    const ta = screen.getByPlaceholderText('Type your message…');
    await userEvent.type(ta, 'Test reply');
    await userEvent.click(screen.getByText('Send').closest('button')!);
    await waitFor(() => expect(ta).toHaveValue(''));
  });

  it('Enter key sends and clears textarea', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByPlaceholderText('Type your message…'));
    const ta = screen.getByPlaceholderText('Type your message…');
    await userEvent.type(ta, 'Enter reply{Enter}');
    await waitFor(() => expect(ta).toHaveValue(''));
  });

  it('Mark Resolved button is visible', async () => {
    render(<AdminMessages />);
    await waitFor(() => screen.getByText('✅ Mark Resolved'));
  });

  it('calls getMessages once on mount', async () => {
    render(<AdminMessages />);
    await waitFor(() => expect(mockGetMessages).toHaveBeenCalledTimes(1));
  });
});

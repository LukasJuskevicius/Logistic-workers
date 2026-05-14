import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { createMessage, getUserMessages, updateMessageRead } =
  await import('../../../src/daos/message.dao.js');

const mockMessage = {
  message_id: 10,
  sender_id: 1,
  receiver_id: 2,
  subject: 'Hello',
  content: 'Hi there!',
  is_admin_message: false,
  is_read: false,
  created_at: '2024-01-01T00:00:00Z'
};

beforeEach(() => jest.clearAllMocks());

describe('message.dao — createMessage', () => {
  it('inserts a message and returns the created row', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockMessage] });
    const result = await createMessage({
      sender_id: 1,
      receiver_id: 2,
      subject: 'Hello',
      content: 'Hi there!',
      is_admin_message: false
    });
    expect(result).toEqual(mockMessage);
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO messages'),
      [1, 2, 'Hello', 'Hi there!', false]
    );
  });

  it('includes RETURNING * in the query', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockMessage] });
    await createMessage({ sender_id: 1, receiver_id: 2, subject: 'S', content: 'C', is_admin_message: false });
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('RETURNING *');
  });

  it('handles admin messages (is_admin_message = true)', async () => {
    database.query.mockResolvedValueOnce({ rows: [{ ...mockMessage, is_admin_message: true }] });
    await createMessage({ sender_id: 1, receiver_id: null, subject: 'Admin', content: 'Note', is_admin_message: true });
    const args = database.query.mock.calls[0][1];
    expect(args[4]).toBe(true);
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('constraint violation'));
    await expect(createMessage({ sender_id: 1, receiver_id: 2, subject: 'S', content: 'C', is_admin_message: false }))
      .rejects.toThrow('constraint violation');
  });
});

describe('message.dao — getUserMessages', () => {
  it('returns all messages for a given user', async () => {
    const messages = [mockMessage, { ...mockMessage, message_id: 11 }];
    database.query.mockResolvedValueOnce({ rows: messages });
    const result = await getUserMessages(1);
    expect(result).toEqual(messages);
    expect(result).toHaveLength(2);
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('sender_id = $1 OR m.receiver_id = $1'),
      [1]
    );
  });

  it('returns empty array when user has no messages', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await getUserMessages(999);
    expect(result).toEqual([]);
  });

  it('joins sender and receiver email fields', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getUserMessages(1);
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('sender_email');
    expect(sql).toContain('receiver_email');
  });

  it('orders results by created_at DESC', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getUserMessages(1);
    const sql = database.query.mock.calls[0][0];
    expect(sql.toUpperCase()).toContain('ORDER BY');
    expect(sql.toUpperCase()).toContain('DESC');
  });
});

describe('message.dao — updateMessageRead', () => {
  it('executes an UPDATE query with the message id', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await updateMessageRead(10);
    expect(database.query).toHaveBeenCalledWith(
      'UPDATE messages SET is_read = true WHERE message_id = $1',
      [10]
    );
  });

  it('returns undefined (fire-and-forget, no RETURNING)', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await updateMessageRead(10);
    expect(result).toBeUndefined();
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('lock timeout'));
    await expect(updateMessageRead(10)).rejects.toThrow('lock timeout');
  });
});

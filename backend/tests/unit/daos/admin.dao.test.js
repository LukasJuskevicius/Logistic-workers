import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { getUsers, getMessages, getStats } =
  await import('../../../src/daos/admin.dao.js');

beforeEach(() => jest.clearAllMocks());

describe('admin.dao — getUsers', () => {
  it('returns all users with joined profile data', async () => {
    const rows = [
      { user_id: 1, email: 'a@a.com', role: 'driver', first_name: 'Jonas', last_name: 'P' },
      { user_id: 2, email: 'b@b.com', role: 'client', first_name: 'UAB', last_name: 'Co' }
    ];
    database.query.mockResolvedValueOnce({ rows });
    const result = await getUsers();
    expect(result).toEqual(rows);
    expect(result).toHaveLength(2);
  });

  it('queries with LEFT JOINs for drivers, clients, admins', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getUsers();
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('LEFT JOIN drivers');
    expect(sql).toContain('LEFT JOIN clients');
    expect(sql).toContain('LEFT JOIN admins');
    expect(sql).toContain('LEFT JOIN user_profiles');
  });

  it('orders by created_at DESC', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getUsers();
    const sql = database.query.mock.calls[0][0].toUpperCase();
    expect(sql).toContain('ORDER BY');
    expect(sql).toContain('DESC');
  });

  it('uses COALESCE to pick the correct name fields', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getUsers();
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('COALESCE');
    expect(sql).toContain('first_name');
    expect(sql).toContain('last_name');
  });

  it('returns empty array when no users exist', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await getUsers();
    expect(result).toEqual([]);
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('timeout'));
    await expect(getUsers()).rejects.toThrow('timeout');
  });
});

describe('admin.dao — getMessages', () => {
  it('returns all messages with sender/receiver emails', async () => {
    const rows = [
      { message_id: 1, subject: 'Hi', sender_email: 'a@a.com', receiver_email: 'b@b.com' }
    ];
    database.query.mockResolvedValueOnce({ rows });
    const result = await getMessages();
    expect(result).toEqual(rows);
  });

  it('joins sender and receiver from users table', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getMessages();
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('JOIN users s ON m.sender_id');
    expect(sql).toContain('LEFT JOIN users r ON m.receiver_id');
  });

  it('orders by created_at DESC', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await getMessages();
    const sql = database.query.mock.calls[0][0].toUpperCase();
    expect(sql).toContain('ORDER BY');
    expect(sql).toContain('DESC');
  });

  it('returns empty array with no messages', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    expect(await getMessages()).toEqual([]);
  });
});

describe('admin.dao — getStats', () => {
  it('returns a single stats object (rows[0])', async () => {
    const stats = {
      total_users: '50',
      total_drivers: '30',
      total_clients: '18',
      total_messages: '120',
      unread_messages: '5'
    };
    database.query.mockResolvedValueOnce({ rows: [stats] });
    const result = await getStats();
    expect(result).toEqual(stats);
  });

  it('fetches all 5 stat counts in one query', async () => {
    database.query.mockResolvedValueOnce({ rows: [{}] });
    await getStats();
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('total_users');
    expect(sql).toContain('total_drivers');
    expect(sql).toContain('total_clients');
    expect(sql).toContain('total_messages');
    expect(sql).toContain('unread_messages');
  });

  it('uses subqueries for each COUNT', async () => {
    database.query.mockResolvedValueOnce({ rows: [{}] });
    await getStats();
    const sql = database.query.mock.calls[0][0];
    expect(sql.match(/SELECT COUNT\(\*\)/g)?.length).toBeGreaterThanOrEqual(5);
  });
});

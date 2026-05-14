import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { updateUserVerified, deleteUser } = await import('../../../src/daos/admin.dao.js');

beforeEach(() => jest.clearAllMocks());

describe('admin.dao — updateUserVerified', () => {
  it('sets is_verified to true (activate)', async () => {
    const updated = { user_id: 1, email: 'a@a.com', is_verified: true };
    database.query.mockResolvedValueOnce({ rows: [updated] });
    const result = await updateUserVerified(1, true);
    expect(result).toEqual(updated);
    expect(database.query).toHaveBeenCalledWith(
      'UPDATE users SET is_verified = $1 WHERE user_id = $2 RETURNING *',
      [true, 1]
    );
  });

  it('sets is_verified to false (suspend)', async () => {
    database.query.mockResolvedValueOnce({ rows: [{ user_id: 2, is_verified: false }] });
    const result = await updateUserVerified(2, false);
    expect(result.is_verified).toBe(false);
    expect(database.query.mock.calls[0][1]).toEqual([false, 2]);
  });

  it('returns undefined when user not found', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await updateUserVerified(999, true);
    expect(result).toBeUndefined();
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('constraint'));
    await expect(updateUserVerified(1, true)).rejects.toThrow('constraint');
  });
});

describe('admin.dao — deleteUser', () => {
  it('executes DELETE query with the userId', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    await deleteUser(5);
    expect(database.query).toHaveBeenCalledWith(
      'DELETE FROM users WHERE user_id = $1',
      [5]
    );
  });

  it('returns undefined (no RETURNING)', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await deleteUser(1);
    expect(result).toBeUndefined();
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('FK violation'));
    await expect(deleteUser(1)).rejects.toThrow('FK violation');
  });
});

import { jest } from '@jest/globals';

// Must mock before importing the module under test
await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { findUserByEmail, findUserById, createUser, findOrCreateGoogleUser } =
  await import('../../../src/daos/user.dao.js');

const mockUser = {
  user_id: 1,
  email: 'test@example.com',
  password_hash: 'hashedpw',
  role: 'driver'
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('user.dao — findUserByEmail', () => {
  it('returns the user when found', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockUser] });
    const result = await findUserByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE email = $1',
      ['test@example.com']
    );
  });

  it('returns undefined when no user exists', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await findUserByEmail('nobody@example.com');
    expect(result).toBeUndefined();
  });

  it('propagates database errors', async () => {
    database.query.mockRejectedValueOnce(new Error('DB down'));
    await expect(findUserByEmail('x@x.com')).rejects.toThrow('DB down');
  });
});

describe('user.dao — findUserById', () => {
  it('returns the user for a valid id', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockUser] });
    const result = await findUserById(1);
    expect(result).toEqual(mockUser);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE user_id = $1',
      [1]
    );
  });

  it('returns undefined when id not found', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await findUserById(999);
    expect(result).toBeUndefined();
  });
});

describe('user.dao — createUser', () => {
  it('inserts a user and returns the created row', async () => {
    const created = { ...mockUser, role: 'client' };
    database.query.mockResolvedValueOnce({ rows: [created] });
    const result = await createUser('new@example.com', 'hash123', 'client');
    expect(result).toEqual(created);
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      ['new@example.com', 'hash123', 'client']
    );
  });

  it('defaults role to client when not specified', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockUser] });
    await createUser('a@b.com', 'hash');
    const call = database.query.mock.calls[0];
    expect(call[1][2]).toBe('client');
  });
});

describe('user.dao — findOrCreateGoogleUser', () => {
  it('returns existing user if email already registered', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockUser] });
    const result = await findOrCreateGoogleUser('google-id', 'test@example.com', 'Test');
    expect(result).toEqual(mockUser);
    // Only one query (findUserByEmail), no INSERT
    expect(database.query).toHaveBeenCalledTimes(1);
  });

  it('creates a new user if email is not found', async () => {
    const newUser = { user_id: 2, email: 'new@google.com', role: 'client' };
    database.query
      .mockResolvedValueOnce({ rows: [] })      // findUserByEmail → not found
      .mockResolvedValueOnce({ rows: [newUser] }); // createUser INSERT
    const result = await findOrCreateGoogleUser('gid', 'new@google.com', 'New');
    expect(result).toEqual(newUser);
    expect(database.query).toHaveBeenCalledTimes(2);
  });
});

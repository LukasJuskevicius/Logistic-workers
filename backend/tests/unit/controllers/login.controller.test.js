import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/daos/user.dao.js', () => ({
  findUserByEmail: jest.fn()
}));
await jest.unstable_mockModule('bcryptjs', () => ({
  default: { compare: jest.fn() }
}));

const { findUserByEmail } = await import('../../../src/daos/user.dao.js');
const bcrypt = (await import('bcryptjs')).default;
const { loginUser } = await import('../../../src/controllers/login.controller.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

function mockReq(body = {}) {
  return { body, login: jest.fn((user, cb) => cb(null)) };
}

const mockUser = {
  id: 1,
  email: 'user@example.com',
  password_hash: '$2b$10$hashedpassword',
  role: 'driver'
};

beforeEach(() => jest.clearAllMocks());

describe('login.controller — loginUser', () => {
  it('returns 400 when email is missing', async () => {
    const res = mockRes();
    await loginUser(mockReq({ password: 'pw' }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
  });

  it('returns 400 when password is missing', async () => {
    const res = mockRes();
    await loginUser(mockReq({ email: 'a@a.com' }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
  });

  it('returns 400 for invalid email format', async () => {
    const res = mockRes();
    await loginUser(mockReq({ email: 'not-an-email', password: 'pw' }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
  });

  it('returns 401 when user not found', async () => {
    findUserByEmail.mockResolvedValueOnce(null);
    const res = mockRes();
    await loginUser(mockReq({ email: 'nobody@x.com', password: 'pw' }), res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('returns 401 when password is wrong', async () => {
    findUserByEmail.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);
    const res = mockRes();
    await loginUser(mockReq({ email: 'user@example.com', password: 'wrong' }), res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('returns 200 with user data on successful login', async () => {
    findUserByEmail.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    const res = mockRes();
    const req = mockReq({ email: 'user@example.com', password: 'correct' });
    await loginUser(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: { id: mockUser.id, email: mockUser.email, role: mockUser.role }
    });
  });

  it('returns 500 when DB throws during user lookup', async () => {
    findUserByEmail.mockRejectedValueOnce(new Error('DB down'));
    const res = mockRes();
    await loginUser(mockReq({ email: 'a@a.com', password: 'pw' }), res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database connection error' });
  });

  it('returns 500 when req.login errors', async () => {
    findUserByEmail.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    const req = {
      body: { email: 'user@example.com', password: 'correct' },
      login: jest.fn((user, cb) => cb(new Error('session fail')))
    };
    const res = mockRes();
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
  });
});

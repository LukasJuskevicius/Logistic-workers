import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { requireAuth, requireRole, authenticateToken } =
  await import('../../../src/middleware/auth.js');

function mockReq(cookies = {}) {
  return { cookies, userId: undefined, userRole: undefined };
}

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => jest.clearAllMocks());

describe('requireAuth', () => {
  it('returns 401 when no sessionId cookie', async () => {
    const res = mockRes();
    const next = jest.fn();
    await requireAuth(mockReq({}), res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_REQUIRED' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when session not found in DB', async () => {
    database.query
      .mockResolvedValueOnce({ rows: [] }); // session lookup → empty
    const req = mockReq({ sessionId: 'bad-token' });
    const res = mockRes();
    const next = jest.fn();
    await requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'SESSION_INVALID' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() and sets req.userId when session is valid', async () => {
    database.query
      .mockResolvedValueOnce({ rows: [{ user_id: 5 }] }) // session lookup
      .mockResolvedValueOnce({ rows: [{ role: 'driver' }] }); // role lookup
    const req = mockReq({ sessionId: 'valid-token' });
    const res = mockRes();
    const next = jest.fn();
    await requireAuth(req, res, next);
    expect(req.userId).toBe(5);
    expect(req.userRole).toBe('driver');
    expect(next).toHaveBeenCalled();
  });

  it('returns 500 when a DB query throws', async () => {
    database.query.mockRejectedValueOnce(new Error('DB error'));
    const req = mockReq({ sessionId: 'any' });
    const res = mockRes();
    const next = jest.fn();
    await requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_ERROR' })
    );
  });

  it('authenticateToken is an alias for requireAuth', () => {
    expect(authenticateToken).toBe(requireAuth);
  });
});

describe('requireRole', () => {
  it('returns 401 when no sessionId cookie', async () => {
    const middleware = requireRole('admin');
    const res = mockRes();
    const next = jest.fn();
    await middleware(mockReq({}), res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when user has wrong role', async () => {
    // requireRole calls requireAuth first (2 queries), then does its own role check
    database.query
      .mockResolvedValueOnce({ rows: [{ user_id: 3 }] })   // requireAuth session
      .mockResolvedValueOnce({ rows: [{ role: 'driver' }] }) // requireAuth role
      .mockResolvedValueOnce({ rows: [{ role: 'driver' }] }); // requireRole role
    const req = mockReq({ sessionId: 'tok' });
    const res = mockRes();
    const next = jest.fn();
    await requireRole('admin')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'INSUFFICIENT_PERMISSIONS' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() when user has the required role', async () => {
    database.query
      .mockResolvedValueOnce({ rows: [{ user_id: 1 }] })
      .mockResolvedValueOnce({ rows: [{ role: 'admin' }] })
      .mockResolvedValueOnce({ rows: [{ role: 'admin' }] });
    const req = mockReq({ sessionId: 'tok' });
    const res = mockRes();
    const next = jest.fn();
    await requireRole('admin')(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.userRole).toBe('admin');
  });

  it('accepts multiple roles (e.g. admin or client)', async () => {
    database.query
      .mockResolvedValueOnce({ rows: [{ user_id: 2 }] })
      .mockResolvedValueOnce({ rows: [{ role: 'client' }] })
      .mockResolvedValueOnce({ rows: [{ role: 'client' }] });
    const req = mockReq({ sessionId: 'tok' });
    const res = mockRes();
    const next = jest.fn();
    await requireRole('admin', 'client')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('accepts a single array argument as roles', async () => {
    database.query
      .mockResolvedValueOnce({ rows: [{ user_id: 2 }] })
      .mockResolvedValueOnce({ rows: [{ role: 'client' }] })
      .mockResolvedValueOnce({ rows: [{ role: 'client' }] });
    const req = mockReq({ sessionId: 'tok' });
    const res = mockRes();
    const next = jest.fn();
    await requireRole(['admin', 'client'])(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

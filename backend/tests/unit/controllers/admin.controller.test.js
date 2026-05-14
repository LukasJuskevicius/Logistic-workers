import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/daos/admin.dao.js', () => ({
  getUsers:           jest.fn(),
  getMessages:        jest.fn(),
  getStats:           jest.fn(),
  updateUserVerified: jest.fn(),
  deleteUser:         jest.fn(),
}));

const { getUsers, getMessages, getStats } = await import('../../../src/daos/admin.dao.js');
const { getAllUsers, getAllMessages, getDashboardStats } =
  await import('../../../src/controllers/admin.controller.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => jest.clearAllMocks());

describe('admin.controller — getAllUsers', () => {
  it('returns 200 with user list', async () => {
    const users = [{ user_id: 1, email: 'a@a.com' }];
    getUsers.mockResolvedValueOnce(users);
    const res = mockRes();
    await getAllUsers({}, res);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('returns 500 on DAO error', async () => {
    getUsers.mockRejectedValueOnce(new Error('DB error'));
    const res = mockRes();
    await getAllUsers({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get users' });
  });
});

describe('admin.controller — getAllMessages', () => {
  it('returns 200 with message list', async () => {
    const msgs = [{ message_id: 1, subject: 'Hello' }];
    getMessages.mockResolvedValueOnce(msgs);
    const res = mockRes();
    await getAllMessages({}, res);
    expect(res.json).toHaveBeenCalledWith(msgs);
  });

  it('returns 500 on DAO error', async () => {
    getMessages.mockRejectedValueOnce(new Error('fail'));
    const res = mockRes();
    await getAllMessages({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get messages' });
  });
});

describe('admin.controller — getDashboardStats', () => {
  it('returns 200 with stats object', async () => {
    const stats = { total_users: '50', total_drivers: '20' };
    getStats.mockResolvedValueOnce(stats);
    const res = mockRes();
    await getDashboardStats({}, res);
    expect(res.json).toHaveBeenCalledWith(stats);
  });

  it('returns 500 on DAO error', async () => {
    getStats.mockRejectedValueOnce(new Error('fail'));
    const res = mockRes();
    await getDashboardStats({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get stats' });
  });
});

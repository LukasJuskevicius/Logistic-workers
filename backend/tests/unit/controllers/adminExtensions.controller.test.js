import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/daos/admin.dao.js', () => ({
  getUsers:            jest.fn(),
  getMessages:         jest.fn(),
  getStats:            jest.fn(),
  updateUserVerified:  jest.fn(),
  deleteUser:          jest.fn(),
}));

const { updateUserVerified, deleteUser } = await import('../../../src/daos/admin.dao.js');
const { updateUserStatus, removeUser } = await import('../../../src/controllers/admin.controller.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => jest.clearAllMocks());

describe('admin.controller — updateUserStatus', () => {
  it('activates a user (status="active" → is_verified=true)', async () => {
    const user = { user_id: 1, is_verified: true };
    updateUserVerified.mockResolvedValueOnce(user);
    const res = mockRes();
    await updateUserStatus({ params: { userId: '1' }, body: { status: 'active' } }, res);
    expect(updateUserVerified).toHaveBeenCalledWith('1', true);
    expect(res.json).toHaveBeenCalledWith({ message: 'User status updated', user });
  });

  it('suspends a user (status="suspended" → is_verified=false)', async () => {
    updateUserVerified.mockResolvedValueOnce({ user_id: 2, is_verified: false });
    const res = mockRes();
    await updateUserStatus({ params: { userId: '2' }, body: { status: 'suspended' } }, res);
    expect(updateUserVerified).toHaveBeenCalledWith('2', false);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User status updated' }));
  });

  it('returns 404 when user not found', async () => {
    updateUserVerified.mockResolvedValueOnce(undefined);
    const res = mockRes();
    await updateUserStatus({ params: { userId: '999' }, body: { status: 'active' } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('returns 500 on DAO error', async () => {
    updateUserVerified.mockRejectedValueOnce(new Error('DB fail'));
    const res = mockRes();
    await updateUserStatus({ params: { userId: '1' }, body: { status: 'active' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update user status' });
  });
});

describe('admin.controller — removeUser', () => {
  it('deletes the user and returns a success message', async () => {
    deleteUser.mockResolvedValueOnce();
    const res = mockRes();
    await removeUser({ params: { userId: '3' } }, res);
    expect(deleteUser).toHaveBeenCalledWith('3');
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
  });

  it('returns 500 on DAO error', async () => {
    deleteUser.mockRejectedValueOnce(new Error('FK constraint'));
    const res = mockRes();
    await removeUser({ params: { userId: '1' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete user' });
  });
});

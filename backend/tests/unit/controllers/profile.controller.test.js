import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/daos/profile.dao.js', () => ({
  getProfileById: jest.fn(),
  updateUserProfile: jest.fn()
}));

const { getProfileById, updateUserProfile } =
  await import('../../../src/daos/profile.dao.js');
const { getProfile, updateProfile, uploadAvatar } =
  await import('../../../src/controllers/profile.controller.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => jest.clearAllMocks());

describe('profile.controller — getProfile', () => {
  it('returns the profile using params.userId', async () => {
    const profile = { user_id: 1, email: 'a@a.com' };
    getProfileById.mockResolvedValueOnce(profile);
    const req = { params: { userId: 1 }, session: {} };
    const res = mockRes();
    await getProfile(req, res);
    expect(res.json).toHaveBeenCalledWith(profile);
    expect(getProfileById).toHaveBeenCalledWith(1);
  });

  it('falls back to session.userId when params.userId is absent', async () => {
    const profile = { user_id: 5 };
    getProfileById.mockResolvedValueOnce(profile);
    const req = { params: {}, session: { userId: 5 } };
    const res = mockRes();
    await getProfile(req, res);
    expect(getProfileById).toHaveBeenCalledWith(5);
  });

  it('returns 404 when profile not found', async () => {
    getProfileById.mockResolvedValueOnce(null);
    const req = { params: { userId: 999 }, session: {} };
    const res = mockRes();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
  });

  it('returns 500 on DAO error', async () => {
    getProfileById.mockRejectedValueOnce(new Error('DB fail'));
    const req = { params: { userId: 1 }, session: {} };
    const res = mockRes();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get profile' });
  });
});

describe('profile.controller — updateProfile', () => {
  it('saves body data and returns updated profile', async () => {
    const updated = { user_id: 1, bio: 'New bio' };
    updateUserProfile.mockResolvedValueOnce(updated);
    const req = { session: { userId: 1 }, body: { bio: 'New bio' } };
    const res = mockRes();
    await updateProfile(req, res);
    expect(updateUserProfile).toHaveBeenCalledWith(1, { bio: 'New bio' });
    expect(res.json).toHaveBeenCalledWith({ message: 'Profile updated', profile: updated });
  });

  it('returns 500 on DAO error', async () => {
    updateUserProfile.mockRejectedValueOnce(new Error('DB fail'));
    const req = { session: { userId: 1 }, body: {} };
    const res = mockRes();
    await updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update profile' });
  });
});

describe('profile.controller — uploadAvatar', () => {
  it('builds an avatar URL and saves it', async () => {
    updateUserProfile.mockResolvedValueOnce({});
    const req = { session: { userId: 7 } };
    const res = mockRes();
    await uploadAvatar(req, res);
    expect(updateUserProfile).toHaveBeenCalledWith(7, {
      profile_picture: '/avatars/user-7.png'
    });
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Avatar uploaded', avatarUrl: '/avatars/user-7.png' })
    );
  });
});

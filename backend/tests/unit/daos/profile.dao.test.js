import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/dbconn/database.js', () => ({
  database: { query: jest.fn() }
}));

const { database } = await import('../../../src/dbconn/database.js');
const { getProfileById, updateUserProfile } =
  await import('../../../src/daos/profile.dao.js');

const mockProfile = {
  user_id: 1,
  email: 'user@example.com',
  role: 'driver',
  first_name: 'Jonas',
  last_name: 'Petraitis',
  bio: 'Experienced driver',
  location: 'Vilnius'
};

beforeEach(() => jest.clearAllMocks());

describe('profile.dao — getProfileById', () => {
  it('returns the profile for a valid user id', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockProfile] });
    const result = await getProfileById(1);
    expect(result).toEqual(mockProfile);
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE u.user_id = $1'),
      [1]
    );
  });

  it('returns undefined when user not found', async () => {
    database.query.mockResolvedValueOnce({ rows: [] });
    const result = await getProfileById(999);
    expect(result).toBeUndefined();
  });

  it('throws if userId is missing', async () => {
    await expect(getProfileById(undefined)).rejects.toThrow('User ID is required');
    await expect(getProfileById(null)).rejects.toThrow('User ID is required');
    // No DB call should have been made
    expect(database.query).not.toHaveBeenCalled();
  });

  it('propagates DB errors', async () => {
    database.query.mockRejectedValueOnce(new Error('connection refused'));
    await expect(getProfileById(1)).rejects.toThrow('connection refused');
  });
});

describe('profile.dao — updateUserProfile', () => {
  const updates = {
    bio: 'Updated bio',
    skills: 'CE, Manual',
    location: 'Kaunas',
    phone: '+370600123',
    linkedin: 'https://linkedin.com/in/jonas',
    profile_picture: null
  };

  it('upserts the profile and returns the updated row', async () => {
    const updated = { ...mockProfile, ...updates };
    database.query.mockResolvedValueOnce({ rows: [updated] });
    const result = await updateUserProfile(1, updates);
    expect(result).toEqual(updated);
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO user_profiles'),
      [1, updates.bio, updates.skills, updates.location, updates.phone, updates.linkedin, updates.profile_picture]
    );
  });

  it('uses ON CONFLICT DO UPDATE (upsert)', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockProfile] });
    await updateUserProfile(1, updates);
    const sql = database.query.mock.calls[0][0];
    expect(sql).toContain('ON CONFLICT');
    expect(sql).toContain('DO UPDATE');
  });

  it('throws if userId is missing', async () => {
    await expect(updateUserProfile(null, updates)).rejects.toThrow('User ID is required');
    expect(database.query).not.toHaveBeenCalled();
  });

  it('handles partial updates (undefined fields passed through)', async () => {
    database.query.mockResolvedValueOnce({ rows: [mockProfile] });
    await updateUserProfile(1, { bio: 'Only bio', skills: undefined });
    const args = database.query.mock.calls[0][1];
    expect(args[0]).toBe(1);
    expect(args[1]).toBe('Only bio');
    expect(args[2]).toBeUndefined();
  });
});

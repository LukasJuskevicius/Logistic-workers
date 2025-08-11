import { getProfileById, updateUserProfile } from '../daos/profile.dao.js';

export async function getProfile(req, res) {
  try {
    const userId = req.params.userId || req.session.userId;
    const profile = await getProfileById(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    const profile = await updateUserProfile(req.session.userId, req.body);
    res.json({ message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function uploadAvatar(req, res) {
  const avatarUrl = `/avatars/user-${req.session.userId}.png`;
  await updateUserProfile(req.session.userId, { profile_picture: avatarUrl });
  res.json({ message: 'Avatar uploaded', avatarUrl });
}

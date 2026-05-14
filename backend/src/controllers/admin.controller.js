import { getUsers, getMessages, getStats, updateUserVerified, deleteUser } from '../daos/admin.dao.js';

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
}

export async function getAllMessages(req, res) {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get messages' });
  }
}

export async function getDashboardStats(req, res) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
}

export async function updateUserStatus(req, res) {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const isVerified = status === 'active';
    const user = await updateUserVerified(userId, isVerified);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User status updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
}

export async function removeUser(req, res) {
  try {
    await deleteUser(req.params.userId);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

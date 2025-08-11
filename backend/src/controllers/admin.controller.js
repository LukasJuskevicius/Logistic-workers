import { getUsers, getMessages, getStats } from '../daos/admin.dao.js';

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

import { database } from '../dbconn/database.js';

export async function updateUserVerified(userId, isVerified) {
  const result = await database.query(
    'UPDATE users SET is_verified = $1 WHERE user_id = $2 RETURNING *',
    [isVerified, userId]
  );
  return result.rows[0];
}

export async function deleteUser(userId) {
  await database.query('DELETE FROM users WHERE user_id = $1', [userId]);
}

export async function getUsers() {
  const result = await database.query(`
    SELECT u.*, up.profile_picture, up.location,
           COALESCE(d.first_name, c.contact_first_name, a.first_name) as first_name,
           COALESCE(d.last_name, c.contact_last_name, a.last_name) as last_name
    FROM users u
    LEFT JOIN user_profiles up ON u.user_id = up.user_id
    LEFT JOIN drivers d ON u.user_id = d.user_id
    LEFT JOIN clients c ON u.user_id = c.user_id
    LEFT JOIN admins a ON u.user_id = a.user_id
    ORDER BY u.created_at DESC
  `);
  return result.rows;
}

export async function getMessages() {
  const result = await database.query(`
    SELECT m.*, s.email as sender_email, r.email as receiver_email
    FROM messages m
    JOIN users s ON m.sender_id = s.user_id
    LEFT JOIN users r ON m.receiver_id = r.user_id
    ORDER BY m.created_at DESC
  `);
  return result.rows;
}

export async function getStats() {
  const result = await database.query(`
    SELECT 
      (SELECT COUNT(*) FROM users) as total_users,
      (SELECT COUNT(*) FROM users WHERE role = 'driver') as total_drivers,
      (SELECT COUNT(*) FROM users WHERE role = 'client') as total_clients,
      (SELECT COUNT(*) FROM messages) as total_messages,
      (SELECT COUNT(*) FROM messages WHERE is_read = false) as unread_messages
  `);
  return result.rows[0];
}

import { database } from '../dbconn/database.js';

export async function createMessage(messageData) {
  const { sender_id, receiver_id, subject, content, is_admin_message } = messageData;
  
  const result = await database.query(`
    INSERT INTO messages (sender_id, receiver_id, subject, content, is_admin_message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [sender_id, receiver_id, subject, content, is_admin_message]);
  
  return result.rows[0];
}

export async function getUserMessages(userId) {
  const result = await database.query(`
    SELECT m.*, 
           s.email as sender_email,
           r.email as receiver_email
    FROM messages m
    JOIN users s ON m.sender_id = s.user_id
    LEFT JOIN users r ON m.receiver_id = r.user_id
    WHERE m.sender_id = $1 OR m.receiver_id = $1
    ORDER BY m.created_at DESC
  `, [userId]);
  
  return result.rows;
}

export async function updateMessageRead(messageId) {
  await database.query(
    'UPDATE messages SET is_read = true WHERE message_id = $1',
    [messageId]
  );
}

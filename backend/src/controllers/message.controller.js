import { createMessage, getUserMessages, updateMessageRead } from '../daos/message.dao.js';

export async function sendMessage(req, res) {
  try {
    const { receiver_id, subject, content, is_admin_message } = req.body;
    const message = await createMessage({
      sender_id: req.session.userId,
      receiver_id,
      subject,
      content,
      is_admin_message: is_admin_message || false
    });
    res.json({ message: 'Message sent', data: message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await getUserMessages(req.session.userId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get messages' });
  }
}

export async function markAsRead(req, res) {
  try {
    await updateMessageRead(req.params.messageId);
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
}

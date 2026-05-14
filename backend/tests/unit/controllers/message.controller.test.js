import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../src/daos/message.dao.js', () => ({
  createMessage: jest.fn(),
  getUserMessages: jest.fn(),
  updateMessageRead: jest.fn()
}));

const { createMessage, getUserMessages, updateMessageRead } =
  await import('../../../src/daos/message.dao.js');
const { sendMessage, getMessages, markAsRead } =
  await import('../../../src/controllers/message.controller.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => jest.clearAllMocks());

describe('message.controller — sendMessage', () => {
  it('creates a message from session user and returns it', async () => {
    const saved = { message_id: 1, sender_id: 3, subject: 'Hi', content: 'Hello' };
    createMessage.mockResolvedValueOnce(saved);
    const req = {
      session: { userId: 3 },
      body: { receiver_id: 2, subject: 'Hi', content: 'Hello', is_admin_message: false }
    };
    const res = mockRes();
    await sendMessage(req, res);
    expect(createMessage).toHaveBeenCalledWith({
      sender_id: 3,
      receiver_id: 2,
      subject: 'Hi',
      content: 'Hello',
      is_admin_message: false
    });
    expect(res.json).toHaveBeenCalledWith({ message: 'Message sent', data: saved });
  });

  it('defaults is_admin_message to false when not provided', async () => {
    createMessage.mockResolvedValueOnce({});
    const req = {
      session: { userId: 1 },
      body: { receiver_id: 2, subject: 'S', content: 'C' }
    };
    await sendMessage(req, mockRes());
    expect(createMessage).toHaveBeenCalledWith(
      expect.objectContaining({ is_admin_message: false })
    );
  });

  it('returns 500 on DAO error', async () => {
    createMessage.mockRejectedValueOnce(new Error('fail'));
    const req = { session: { userId: 1 }, body: {} };
    const res = mockRes();
    await sendMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to send message' });
  });
});

describe('message.controller — getMessages', () => {
  it('returns all messages for the session user', async () => {
    const msgs = [{ message_id: 1 }, { message_id: 2 }];
    getUserMessages.mockResolvedValueOnce(msgs);
    const req = { session: { userId: 4 } };
    const res = mockRes();
    await getMessages(req, res);
    expect(getUserMessages).toHaveBeenCalledWith(4);
    expect(res.json).toHaveBeenCalledWith(msgs);
  });

  it('returns 500 on DAO error', async () => {
    getUserMessages.mockRejectedValueOnce(new Error('fail'));
    const req = { session: { userId: 1 } };
    const res = mockRes();
    await getMessages(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get messages' });
  });
});

describe('message.controller — markAsRead', () => {
  it('calls updateMessageRead with the route param', async () => {
    updateMessageRead.mockResolvedValueOnce();
    const req = { params: { messageId: '7' } };
    const res = mockRes();
    await markAsRead(req, res);
    expect(updateMessageRead).toHaveBeenCalledWith('7');
    expect(res.json).toHaveBeenCalledWith({ message: 'Message marked as read' });
  });

  it('returns 500 on DAO error', async () => {
    updateMessageRead.mockRejectedValueOnce(new Error('fail'));
    const req = { params: { messageId: '1' } };
    const res = mockRes();
    await markAsRead(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update message' });
  });
});

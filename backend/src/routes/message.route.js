import express from 'express';
import { sendMessage, getMessages, markAsRead } from '../controllers/message.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.post('/api/messages', sendMessage);
router.get('/api/messages', getMessages);
router.put('/api/messages/:messageId/read', markAsRead);

export default router;

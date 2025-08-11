import express from 'express';
import { sendMessage, getMessages, markAsRead } from '../controllers/message.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.post('/messages', sendMessage);
router.get('/messages', getMessages);
router.put('/messages/:messageId/read', markAsRead);

export default router;

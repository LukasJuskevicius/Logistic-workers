import express from 'express';
import { getAllUsers, getAllMessages, getDashboardStats } from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/users', getAllUsers);
router.get('/messages', getAllMessages);
router.get('/stats', getDashboardStats);

export default router;

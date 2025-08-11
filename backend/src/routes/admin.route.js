import express from 'express';
import { getAllUsers, getAllMessages, getDashboardStats } from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/api/admin/users', getAllUsers);
router.get('/api/admin/messages', getAllMessages);
router.get('/api/admin/stats', getDashboardStats);

export default router;

import express from 'express';
import { getAllUsers, getAllMessages, getDashboardStats, updateUserStatus, removeUser } from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/api/admin/users', getAllUsers);
router.get('/api/admin/messages', getAllMessages);
router.get('/api/admin/stats', getDashboardStats);
router.patch('/api/admin/users/:userId/status', updateUserStatus);
router.delete('/api/admin/users/:userId', removeUser);

export default router;

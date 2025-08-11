import express from 'express';
import { logoutUser } from '../controllers/logout.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Logout route - requires authentication
router.post('/api/auth/logout', requireAuth, logoutUser);

export default router;

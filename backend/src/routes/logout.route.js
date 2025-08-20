import express from 'express';
import { logoutUser } from '../controllers/logout.controller.js';

const router = express.Router();

// Logout route - handles its own authentication check
router.post('/api/logout', logoutUser);

export default router;

import express from 'express';
import { googleAuth, googleCallback, checkAuth } from '../controllers/oauth.controller.js';

const router = express.Router();

// OAuth routes
router.get('/api/auth/google', googleAuth);
router.get('/api/auth/google/callback', googleCallback);

// Check authentication status
router.get('/api/auth/check', checkAuth);

export default router;

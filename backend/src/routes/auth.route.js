import express from 'express';
import { loginUser, checkAuth, googleAuth, googleCallback } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/auth', checkAuth);
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;

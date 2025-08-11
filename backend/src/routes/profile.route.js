import express from 'express';
import { getProfile, updateProfile, uploadAvatar } from '../controllers/profile.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth); // All profile routes need auth

router.get('/profile/:userId?', getProfile);
router.put('/profile', updateProfile);
router.post('/profile/avatar', uploadAvatar);

export default router;

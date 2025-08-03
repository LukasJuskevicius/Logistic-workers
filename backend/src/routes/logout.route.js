import express from 'express';
import { LogoutController } from '../controllers/logout.controller.js';

const router = express.Router();

// POST /api/logout - User logout
router.post('/', async (req, res) => {
  try {
    const result = await LogoutController.logout();

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }

  } catch (error) {
    console.error('❌ Logout route error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 
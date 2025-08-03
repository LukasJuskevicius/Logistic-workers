import express from 'express';
import { LoginController } from '../controllers/login.controller.js';
import { validateLoginInput } from '../middleware/auth.validation.js';

const router = express.Router();

// POST /api/login - User login
router.post('/', validateLoginInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await LoginController.login(email, password);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }

  } catch (error) {
    console.error('❌ Login route error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 
import express from 'express';
import { RegisterController } from '../controllers/register.controller.js';
import { validateRegistrationInput } from '../middleware/auth.validation.js';

const router = express.Router();

// POST /api/register - User registration
router.post('/', validateRegistrationInput, async (req, res) => {
  try {
    const { email, password, firstName, lastName, type, ...otherData } = req.body;

    const userData = {
      email,
      password,
      firstName,
      lastName,
      type,
      ...otherData
    };

    const result = await RegisterController.register(userData, type);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }

  } catch (error) {
    console.error('❌ Register route error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 
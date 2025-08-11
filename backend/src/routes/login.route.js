import express from 'express';
import { loginUser } from '../controllers/login.controller.js';
import { validateLogin, sanitizeBody } from '../middleware/validation.js';

const router = express.Router();

// Login route with validation
router.post('/api/auth/login', sanitizeBody, validateLogin, loginUser);

export default router;

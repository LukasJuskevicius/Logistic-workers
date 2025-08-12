import { validateLogin, sanitizeBody } from '../middleware/validation.js';
import { loginUser } from '../controllers/login.controller.js';
import express from 'express';

const router = express.Router();

router.post('/api/auth/login', sanitizeBody, validateLogin, loginUser);

export default router;
import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../daos/user.dao.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'client' } = req.body;
    
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, passwordHash, role);
    res.json({ message: 'User created', userId: user.user_id });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

export default router;
import express from 'express';
import { registerUser, loginUser, getUserProfile, logoutUser, getAuth } from '../controllers/authController.js';
import protect  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/me', protect, getAuth);
router.get('/logout', logoutUser);

export default router;

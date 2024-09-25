import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddlware.js'; 

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get User Profile (protected)
router.get('/profile', protect, getUserProfile);

// Update User Information (protected)
router.put('/profile', protect, updateUser);

export default router;

// routes/auth.js
const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController'); // Import controller methods
const verifyToken = require('../middleware/authMiddleware'); // Import the token verification middleware
const router = express.Router();

// Public routes
router.post('/register', register); // Route to register a new user
router.post('/login', login); // Route to log in a user

// Protected routes
router.get('/profile', verifyToken, getProfile); // Get authenticated user's profile

module.exports = router;

// routes/userInfo.js

const express = require('express');
const router = express.Router();
const { addUserInfo, getUserInfo, updateUserInfo, deleteUserInfo, getUserInfoById } = require('../controllers/userInfoController'); // Import controller functions
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware

// Routes for user info
router.post('/', authMiddleware, addUserInfo); // Add new user info
router.get('/', authMiddleware, getUserInfo); // Get all user info for authenticated user
router.get('/:id', authMiddleware, getUserInfoById); // Get user info by ID
router.put('/:id', authMiddleware, updateUserInfo); // Update user info
router.delete('/:id', authMiddleware, deleteUserInfo); // Delete user info

module.exports = router;

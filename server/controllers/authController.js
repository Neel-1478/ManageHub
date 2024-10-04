// controllers/authController.js
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jwt for generating tokens
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in a user
const login = async (req, res) => {
  const { email, password } = req.body; // Destructure the request body

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId).select('-password'); // Find the user and exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return the user profile
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  register,
  login,
  getProfile,
  
};

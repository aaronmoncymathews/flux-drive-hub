const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const { authSchemas } = require('../validation/schemas');
const { createRateLimiter } = require('../middleware/security');

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 attempts per 15 minutes
const loginLimiter = createRateLimiter(15 * 60 * 1000, 3); // 3 attempts per 15 minutes

// Register
router.post('/register', authLimiter, validation(authSchemas.register), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        licenses: user.licenses,
        hoursDriven: user.hoursDriven,
        friends: user.friends,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', loginLimiter, validation(authSchemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        licenses: user.licenses,
        hoursDriven: user.hoursDriven,
        friends: user.friends,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user - requires authentication
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('friends', 'email licenses hoursDriven');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

module.exports = router;
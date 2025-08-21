const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const { userSchemas } = require('../validation/schemas');

const router = express.Router();

// Search users - SECURED: Input validation and NoSQL injection prevention
router.get('/search', auth, validation(userSchemas.search), async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (search) {
      // Escape special regex characters to prevent NoSQL injection
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.email = { $regex: escapedSearch, $options: 'i' };
    }

    // Ensure current user is excluded from query
    query._id = { $ne: req.user.userId };

    const users = await User.find(query)
      .select('email licenses hoursDriven')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ email: 1 })
      .lean(); // Use lean() for better performance

    res.json(users);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Add friend
router.post('/friends/:userId', auth, validation(userSchemas.addFriend), async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user.userId);
    
    if (currentUser.friends.includes(userId)) {
      return res.status(400).json({ error: 'User already in friends list' });
    }

    currentUser.friends.push(userId);
    await currentUser.save();

    const updatedUser = await User.findById(req.user.userId)
      .populate('friends', 'email licenses hoursDriven');
    
    res.json(updatedUser.friends);
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ error: 'Failed to add friend' });
  }
});

// Remove friend
router.delete('/friends/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user.userId);
    
    currentUser.friends = currentUser.friends.filter(
      friendId => friendId.toString() !== userId
    );
    await currentUser.save();

    const updatedUser = await User.findById(req.user.userId)
      .populate('friends', 'email licenses hoursDriven');
    
    res.json(updatedUser.friends);
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

module.exports = router;
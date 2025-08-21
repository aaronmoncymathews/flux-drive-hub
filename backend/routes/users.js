const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Search users
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const users = await User.find({
      email: { $regex: query, $options: 'i' },
      _id: { $ne: req.user.userId } // Exclude current user
    })
    .select('email licenses hoursDriven')
    .limit(10);

    res.json(users);
  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Add friend
router.post('/friends/:userId', auth, async (req, res) => {
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
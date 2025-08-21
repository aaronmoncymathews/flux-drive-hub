const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const validation = require('../middleware/validation');
const { adminSchemas } = require('../validation/schemas');

const router = express.Router();

// Award license to user
router.post('/award-license', auth, adminAuth, validation(adminSchemas.awardLicense), async (req, res) => {
  try {
    const { userId, sim, category, track } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if license already exists
    const existingLicense = user.licenses.find(
      license => license.sim === sim && 
                 license.category === category && 
                 license.track === track
    );

    if (existingLicense) {
      return res.status(400).json({ error: 'License already awarded' });
    }

    // Add new license
    user.licenses.push({
      sim,
      category,
      track,
      earned: new Date()
    });

    await user.save();

    res.json({ 
      message: 'License awarded successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Award license error:', error);
    res.status(500).json({ error: 'Failed to award license' });
  }
});

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    let query = {};
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get all bookings (admin only)
router.get('/bookings', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Update user stats (admin only) - SECURED: Only allows stats field updates
router.patch('/users/:userId/stats', auth, adminAuth, validation(adminSchemas.updateUserStats), async (req, res) => {
  try {
    const { userId } = req.params;
    const { stats } = req.body;

    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Only allow updates to stats field - prevent privilege escalation
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { stats } }, // Only stats can be updated
      { 
        new: true,
        runValidators: true,
        fields: { password: 0 } // Exclude password from response
      }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Stats updated successfully', stats: user.stats });
  } catch (error) {
    console.error('Update user stats error:', error);
    res.status(500).json({ error: 'Failed to update user stats' });
  }
});

module.exports = router;
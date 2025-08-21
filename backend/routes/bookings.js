const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      simulator,
      track,
      car,
      sessionType,
      date,
      duration,
      assistanceServices,
      paymentIntentId
    } = req.body;

    // Validate session type for licensing
    if (sessionType === 'Race') {
      const user = await User.findById(req.user.userId);
      const hasLicense = user.licenses.some(license => 
        license.sim === simulator && license.track === track
      );
      
      if (!hasLicense) {
        return res.status(400).json({ 
          error: 'License required for race sessions on this track' 
        });
      }
    }

    // Calculate total cost
    const baseCost = duration * 10; // ₹10 per minute
    const serviceFee = 50; // Base service charge
    const assistanceCost = Object.values(assistanceServices || {})
      .filter(Boolean).length * 50; // ₹50 per assistance service
    
    const totalCost = baseCost + serviceFee + assistanceCost;

    const booking = new Booking({
      user: req.user.userId,
      simulator,
      track,
      car,
      sessionType,
      date,
      duration,
      assistanceServices: assistanceServices || {},
      totalCost,
      paymentIntentId
    });

    await booking.save();
    await booking.populate('user', 'email');

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .sort({ date: -1 })
      .populate('user', 'email');
    
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Update booking status (for payment completion)
router.patch('/:bookingId/status', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus, status } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, user: req.user.userId },
      { paymentStatus, status },
      { new: true }
    ).populate('user', 'email');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

module.exports = router;
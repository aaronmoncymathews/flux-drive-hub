const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const validation = require('../middleware/validation');
const { eventSchemas } = require('../validation/schemas');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    
    let query = {};
    if (type) {
      query.type = type;
    }

    const events = await Event.find(query)
      .populate('participants.user', 'email')
      .populate('results.user', 'email')
      .sort({ date: type === 'past' ? -1 : 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to get events' });
  }
});

// Create event (admin only)
router.post('/', auth, adminAuth, validation(eventSchemas.create), async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Register for event
router.post('/:eventId/register', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.type === 'past') {
      return res.status(400).json({ error: 'Cannot register for past events' });
    }

    const alreadyRegistered = event.participants.some(
      p => p.user.toString() === req.user.userId
    );

    if (alreadyRegistered) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full' });
    }

    event.participants.push({ user: req.user.userId });
    await event.save();
    
    await event.populate('participants.user', 'email');
    
    res.json(event);
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

// Update event results (admin only)
router.patch('/:eventId/results', auth, adminAuth, validation(eventSchemas.updateResults), async (req, res) => {
  try {
    const { eventId } = req.params;
    const { results } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { results, type: 'past' },
      { new: true }
    ).populate('results.user', 'email');

    res.json(event);
  } catch (error) {
    console.error('Update event results error:', error);
    res.status(500).json({ error: 'Failed to update event results' });
  }
});

module.exports = router;
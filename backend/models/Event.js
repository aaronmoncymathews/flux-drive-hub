const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['upcoming', 'past'],
    default: 'upcoming'
  },
  simulator: {
    type: String,
    enum: ['ACC', 'AMS2', 'Both']
  },
  track: String,
  maxParticipants: {
    type: Number,
    default: 20
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  results: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    position: Number,
    lapTime: Number,
    points: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
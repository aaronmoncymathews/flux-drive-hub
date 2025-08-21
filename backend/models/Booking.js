const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  simulator: {
    type: String,
    required: true,
    enum: ['ACC', 'AMS2']
  },
  track: {
    type: String,
    required: true
  },
  car: {
    type: String,
    required: true
  },
  sessionType: {
    type: String,
    required: true,
    enum: ['Practice', 'Hotlap', 'Race']
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  assistanceServices: {
    coaching: { type: Boolean, default: false },
    postLapAnalysis: { type: Boolean, default: false },
    setupAssistance: { type: Boolean, default: false }
  },
  totalCost: {
    type: Number,
    required: true
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
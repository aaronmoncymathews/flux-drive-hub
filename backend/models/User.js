const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const licenseSchema = new mongoose.Schema({
  sim: {
    type: String,
    required: true,
    enum: ['ACC', 'AMS2']
  },
  category: {
    type: String,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  earned: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  licenses: [licenseSchema],
  hoursDriven: {
    type: Number,
    default: 0
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  stats: {
    raceWins: { type: Number, default: 0 },
    sessionsCompleted: { type: Number, default: 0 },
    incidents: { type: Number, default: 0 },
    bestLapTimes: [{
      sim: String,
      track: String,
      lapTime: Number,
      date: { type: Date, default: Date.now }
    }],
    consistency: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
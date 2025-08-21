const Joi = require('joi');

// Authentication schemas
const authSchemas = {
  register: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'any.required': 'Password is required'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required(),
    password: Joi.string()
      .required()
  })
};

// Booking schemas
const bookingSchemas = {
  create: Joi.object({
    sim: Joi.string()
      .valid('ACC', 'AMS2')
      .required(),
    track: Joi.string()
      .trim()
      .max(100)
      .required(),
    car: Joi.string()
      .trim()
      .max(100)
      .required(),
    sessionType: Joi.string()
      .valid('Practice', 'Hotlap', 'Race')
      .required(),
    date: Joi.date()
      .min('now')
      .max(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // 30 days from now
      .required(),
    duration: Joi.number()
      .integer()
      .min(15)
      .max(300)
      .required(),
    assistanceServices: Joi.array()
      .items(Joi.string().valid('coaching', 'postLapAnalysis', 'setupAssistance'))
      .default([])
  }),

  updateStatus: Joi.object({
    status: Joi.string()
      .valid('pending', 'confirmed', 'completed', 'cancelled')
      .required()
  })
};

// Admin schemas
const adminSchemas = {
  awardLicense: Joi.object({
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid user ID format'
      }),
    sim: Joi.string()
      .valid('ACC', 'AMS2')
      .required(),
    category: Joi.string()
      .trim()
      .max(50)
      .required(),
    track: Joi.string()
      .trim()
      .max(100)
      .required()
  }),

  updateUserStats: Joi.object({
    stats: Joi.object({
      raceWins: Joi.number().integer().min(0).max(10000),
      sessionsCompleted: Joi.number().integer().min(0).max(100000),
      incidents: Joi.number().integer().min(0).max(10000),
      bestLapTimes: Joi.array().items(Joi.object({
        sim: Joi.string().valid('ACC', 'AMS2').required(),
        track: Joi.string().trim().max(100).required(),
        lapTime: Joi.number().positive().max(3600000).required(), // Max 1 hour in ms
        date: Joi.date().default(Date.now)
      })).max(100),
      consistency: Joi.number().min(0).max(100)
    }).required()
  })
};

// User schemas
const userSchemas = {
  search: Joi.object({
    search: Joi.string()
      .trim()
      .max(100)
      .pattern(/^[a-zA-Z0-9@._-]+$/)
      .messages({
        'string.pattern.base': 'Search term contains invalid characters'
      }),
    page: Joi.number().integer().min(1).max(100).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  }),

  addFriend: Joi.object({
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid user ID format'
      })
  })
};

// Event schemas
const eventSchemas = {
  create: Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(200)
      .required(),
    description: Joi.string()
      .trim()
      .max(1000)
      .required(),
    date: Joi.date()
      .min('now')
      .required(),
    type: Joi.string()
      .valid('upcoming', 'past')
      .default('upcoming'),
    maxParticipants: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(50),
    sim: Joi.string()
      .valid('ACC', 'AMS2')
      .required(),
    track: Joi.string()
      .trim()
      .max(100)
      .required()
  }),

  updateResults: Joi.object({
    results: Joi.array()
      .items(Joi.object({
        userId: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required(),
        position: Joi.number().integer().min(1).required(),
        lapTime: Joi.number().positive().max(3600000).required()
      }))
      .min(1)
      .max(100)
      .required()
  })
};

module.exports = {
  authSchemas,
  bookingSchemas,
  adminSchemas,
  userSchemas,
  eventSchemas
};
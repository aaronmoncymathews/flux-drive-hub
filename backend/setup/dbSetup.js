const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Event = require('../models/Event');

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fluxterrasimworks', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@fluxterrasimworks.com' });
    if (!adminExists) {
      const adminUser = new User({
        email: 'admin@fluxterrasimworks.com',
        password: 'admin123',
        role: 'admin',
        hoursDriven: 150,
        stats: {
          raceWins: 25,
          sessionsCompleted: 200,
          incidents: 5,
          consistency: 95
        }
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    // Create demo user
    const demoUserExists = await User.findOne({ email: 'user@example.com' });
    if (!demoUserExists) {
      const demoUser = new User({
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
        hoursDriven: 50,
        licenses: [
          { sim: 'ACC', category: 'GT3', track: 'Monza', earned: new Date('2024-01-15') }
        ],
        stats: {
          raceWins: 5,
          sessionsCompleted: 30,
          incidents: 2,
          consistency: 85,
          bestLapTimes: [
            { sim: 'ACC', track: 'Monza', lapTime: 148500, date: new Date() },
            { sim: 'ACC', track: 'Spa', lapTime: 216800, date: new Date() }
          ]
        }
      });
      await demoUser.save();
      console.log('Demo user created');
    }

    // Create sample events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const sampleEvents = [
        {
          title: 'Monza Hotlap Contest',
          description: 'Set your fastest lap time at Monza in GT3 category',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          type: 'upcoming',
          simulator: 'ACC',
          track: 'Monza',
          maxParticipants: 20
        },
        {
          title: 'Spa 24 Hours Endurance',
          description: 'Multi-class endurance race at Spa-Francorchamps',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          type: 'upcoming',
          simulator: 'ACC',
          track: 'Spa-Francorchamps',
          maxParticipants: 30
        },
        {
          title: 'Brands Hatch GP Championship',
          description: 'Previous championship race results',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          type: 'past',
          simulator: 'ACC',
          track: 'Brands Hatch',
          results: [
            { position: 1, lapTime: 138500, points: 25 },
            { position: 2, lapTime: 139200, points: 18 },
            { position: 3, lapTime: 139800, points: 15 }
          ]
        }
      ];

      await Event.insertMany(sampleEvents);
      console.log('Sample events created');
    }

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
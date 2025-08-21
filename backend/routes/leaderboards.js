const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');

const router = express.Router();

// Get leaderboards
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { sim, category, timeframe } = req.query;
    
    let result = [];

    switch (type) {
      case 'fastest-laps':
        result = await User.aggregate([
          { $unwind: '$stats.bestLapTimes' },
          ...(sim ? [{ $match: { 'stats.bestLapTimes.sim': sim } }] : []),
          {
            $group: {
              _id: {
                userId: '$_id',
                email: '$email',
                track: '$stats.bestLapTimes.track'
              },
              bestTime: { $min: '$stats.bestLapTimes.lapTime' },
              date: { $first: '$stats.bestLapTimes.date' }
            }
          },
          { $sort: { bestTime: 1 } },
          { $limit: 50 }
        ]);
        break;

      case 'most-licenses':
        result = await User.find({}, 'email licenses')
          .sort({ 'licenses': -1 })
          .limit(50)
          .lean();
        result = result.map(user => ({
          ...user,
          licenseCount: user.licenses.length
        }));
        break;

      case 'most-hours':
        result = await User.find({}, 'email hoursDriven')
          .sort({ hoursDriven: -1 })
          .limit(50);
        break;

      case 'most-wins':
        result = await User.find({}, 'email stats.raceWins')
          .sort({ 'stats.raceWins': -1 })
          .limit(50);
        break;

      case 'highest-consistency':
        result = await User.find({ 'stats.consistency': { $gt: 0 } }, 'email stats.consistency')
          .sort({ 'stats.consistency': -1 })
          .limit(50);
        break;

      case 'cleanest-driver':
        result = await User.find({}, 'email stats.incidents stats.sessionsCompleted')
          .lean();
        result = result
          .filter(user => user.stats.sessionsCompleted > 0)
          .map(user => ({
            ...user,
            incidentRate: user.stats.incidents / user.stats.sessionsCompleted
          }))
          .sort((a, b) => a.incidentRate - b.incidentRate)
          .slice(0, 50);
        break;

      case 'most-sessions':
        result = await User.find({}, 'email stats.sessionsCompleted')
          .sort({ 'stats.sessionsCompleted': -1 })
          .limit(50);
        break;

      default:
        return res.status(400).json({ error: 'Invalid leaderboard type' });
    }

    res.json(result);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to get leaderboard data' });
  }
});

module.exports = router;
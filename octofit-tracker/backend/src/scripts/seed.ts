import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya] = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        password: 'octofit-demo',
        profile: { fitnessLevel: 'intermediate', goal: 'Improve endurance' },
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        password: 'octofit-demo',
        profile: { fitnessLevel: 'advanced', goal: 'Build strength' },
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        password: 'octofit-demo',
        profile: { fitnessLevel: 'beginner', goal: 'Create a consistent routine' },
      },
    ]);

    const [trailblazers, sunrise] = await Team.create([
      {
        name: 'Trailblazers',
        description: 'A friendly team focused on steady progress outdoors.',
        members: [maya._id, jordan._id],
        captain: maya._id,
      },
      {
        name: 'Sunrise Squad',
        description: 'Early risers building healthy habits together.',
        members: [priya._id],
        captain: priya._id,
      },
    ]);

    await Activity.create([
      { user: maya._id, team: trailblazers._id, type: 'running', durationMinutes: 38, distanceKm: 5.2, caloriesBurned: 410, completedAt: new Date('2026-08-18') },
      { user: jordan._id, team: trailblazers._id, type: 'strength', durationMinutes: 50, caloriesBurned: 360, completedAt: new Date('2026-08-19') },
      { user: priya._id, team: sunrise._id, type: 'yoga', durationMinutes: 25, caloriesBurned: 120, completedAt: new Date('2026-08-20') },
    ]);

    await LeaderboardEntry.create([
      { user: jordan._id, team: trailblazers._id, points: 980, rank: 1, period: 'August 2026' },
      { user: maya._id, team: trailblazers._id, points: 845, rank: 2, period: 'August 2026' },
      { user: priya._id, team: sunrise._id, points: 510, rank: 3, period: 'August 2026' },
    ]);

    await Workout.create([
      {
        title: 'Steady State Run',
        description: 'A conversational-pace run for aerobic endurance.',
        type: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: [{ name: 'Outdoor run', sets: 1, reps: 35 }],
      },
      {
        title: 'Full Body Foundations',
        description: 'A balanced strength session using bodyweight movements.',
        type: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, reps: 30 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

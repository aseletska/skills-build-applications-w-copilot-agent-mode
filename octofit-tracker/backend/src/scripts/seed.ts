/**
 * Seed the octofit_db database with test data
 *
 * This script connects to the local MongoDB instance and populates
 * collections: users, teams, activities, leaderboard, workouts.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';


import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);
  console.log('Connected to', mongoUri);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // Create teams
  const alpha = await Team.create({ name: 'Alpha', description: 'Early risers team' });
  const beta = await Team.create({ name: 'Beta', description: 'Weekend warriors' });

  // Create users
  const alex = await User.create({ name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'coach', team: alpha._id });
  const sam = await User.create({ name: 'Samantha Lee', email: 'sam.lee@example.com', role: 'user', team: beta._id });
  const priya = await User.create({ name: 'Priya Kumar', email: 'priya.kumar@example.com', role: 'user', team: alpha._id });

  // Update team memberships
  alpha.members = [alex._id, priya._id];
  beta.members = [sam._id];
  await alpha.save();
  await beta.save();

  // Create activities
  await Activity.create([
    { user: alex._id, type: 'run', durationMinutes: 30, distanceKm: 5, calories: 320, date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { user: sam._id, type: 'cycle', durationMinutes: 45, distanceKm: 18, calories: 540, date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { user: priya._id, type: 'swim', durationMinutes: 25, distanceKm: 1.2, calories: 280, date: new Date() },
  ]);

  // Create leaderboard entries
  await Leaderboard.create([
    { user: alex._id, username: 'AlexJ', points: 1450, rank: 1 },
    { user: priya._id, username: 'PriyaK', points: 1100, rank: 2 },
    { user: sam._id, username: 'Samantha', points: 980, rank: 3 },
  ]);

  // Create workouts
  await Workout.create([
    {
      name: 'HIIT Express',
      durationMinutes: 20,
      focus: 'cardio',
      exercises: [
        { name: 'Burpees', reps: 15, sets: 3 },
        { name: 'Mountain Climbers', durationSeconds: 45 },
      ],
    },
    {
      name: 'Upper Strength',
      durationMinutes: 35,
      focus: 'upper-body',
      exercises: [
        { name: 'Push-ups', reps: 12, sets: 4 },
        { name: 'Dumbbell Rows', reps: 10, sets: 4 },
      ],
    },
  ]);

  console.log('Seeding complete. Closing connection.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

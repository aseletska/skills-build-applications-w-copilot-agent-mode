import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Workout from './models/workout';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const users = [
  { id: 'user-1', name: 'Alex', email: 'alex@example.com', team: 'alpha' },
  { id: 'user-2', name: 'Sam', email: 'sam@example.com', team: 'beta' }
];

const teams = [
  { id: 'team-1', name: 'Alpha', members: 2 },
  { id: 'team-2', name: 'Beta', members: 1 }
];

const activities = [
  { id: 'activity-1', type: 'run', durationMinutes: 30, distanceKm: 5 },
  { id: 'activity-2', type: 'cycle', durationMinutes: 45, distanceKm: 18 }
];

const leaderboard = [
  { id: 'entry-1', username: 'Alex', points: 1200 },
  { id: 'entry-2', username: 'Sam', points: 950 }
];

const workouts = [
  { id: 'workout-1', name: 'HIIT', durationMinutes: 20, focus: 'cardio' },
  { id: 'workout-2', name: 'Strength', durationMinutes: 35, focus: 'upper-body' }
];

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbUsers = await User.find().populate('team').lean();
      return res.json({ apiBaseUrl, users: dbUsers });
    } catch (err) {
      console.error('Error fetching users from DB:', err);
    }
  }
  res.json({ apiBaseUrl, users });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const created = await User.create(req.body);
      return res.status(201).json({ message: 'User created', user: created, apiBaseUrl });
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }
  const user = { id: `user-${Date.now()}`, ...req.body };
  users.push(user);
  res.status(201).json({ message: 'User created', user, apiBaseUrl });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbTeams = await Team.find().populate('members').lean();
      return res.json({ apiBaseUrl, teams: dbTeams });
    } catch (err) {
      console.error('Error fetching teams from DB:', err);
    }
  }
  res.json({ apiBaseUrl, teams });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const created = await Team.create(req.body);
      return res.status(201).json({ message: 'Team created', team: created, apiBaseUrl });
    } catch (err) {
      console.error('Error creating team:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }
  const team = { id: `team-${Date.now()}`, ...req.body };
  teams.push(team);
  res.status(201).json({ message: 'Team created', team, apiBaseUrl });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbActivities = await Activity.find().populate('user').lean();
      return res.json({ apiBaseUrl, activities: dbActivities });
    } catch (err) {
      console.error('Error fetching activities from DB:', err);
    }
  }
  res.json({ apiBaseUrl, activities });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const created = await Activity.create(req.body);
      return res.status(201).json({ message: 'Activity created', activity: created, apiBaseUrl });
    } catch (err) {
      console.error('Error creating activity:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }
  const activity = { id: `activity-${Date.now()}`, ...req.body };
  activities.push(activity);
  res.status(201).json({ message: 'Activity created', activity, apiBaseUrl });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbEntries = await Leaderboard.find().populate('user').sort({ points: -1 }).lean();
      return res.json({ apiBaseUrl, leaderboard: dbEntries });
    } catch (err) {
      console.error('Error fetching leaderboard from DB:', err);
    }
  }
  res.json({ apiBaseUrl, leaderboard });
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const created = await Leaderboard.create(req.body);
      return res.status(201).json({ message: 'Leaderboard entry created', entry: created, apiBaseUrl });
    } catch (err) {
      console.error('Error creating leaderboard entry:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }
  const entry = { id: `entry-${Date.now()}`, ...req.body };
  leaderboard.push(entry);
  res.status(201).json({ message: 'Leaderboard entry created', entry, apiBaseUrl });
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbWorkouts = await Workout.find().lean();
      return res.json({ apiBaseUrl, workouts: dbWorkouts });
    } catch (err) {
      console.error('Error fetching workouts from DB:', err);
    }
  }
  res.json({ apiBaseUrl, workouts });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const created = await Workout.create(req.body);
      return res.status(201).json({ message: 'Workout created', workout: created, apiBaseUrl });
    } catch (err) {
      console.error('Error creating workout:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }
  const workout = { id: `workout-${Date.now()}`, ...req.body };
  workouts.push(workout);
  res.status(201).json({ message: 'Workout created', workout, apiBaseUrl });
});

void mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected to ${mongoUri}`);
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error);
  });

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});

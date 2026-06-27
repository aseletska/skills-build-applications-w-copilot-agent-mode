import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
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
app.get(['/api/users', '/api/users/'], (_req, res) => {
    res.json({ apiBaseUrl, users });
});
app.post(['/api/users', '/api/users/'], (req, res) => {
    const user = { id: `user-${Date.now()}`, ...req.body };
    users.push(user);
    res.status(201).json({ message: 'User created', user, apiBaseUrl });
});
app.get(['/api/teams', '/api/teams/'], (_req, res) => {
    res.json({ apiBaseUrl, teams });
});
app.post(['/api/teams', '/api/teams/'], (req, res) => {
    const team = { id: `team-${Date.now()}`, ...req.body };
    teams.push(team);
    res.status(201).json({ message: 'Team created', team, apiBaseUrl });
});
app.get(['/api/activities', '/api/activities/'], (_req, res) => {
    res.json({ apiBaseUrl, activities });
});
app.post(['/api/activities', '/api/activities/'], (req, res) => {
    const activity = { id: `activity-${Date.now()}`, ...req.body };
    activities.push(activity);
    res.status(201).json({ message: 'Activity created', activity, apiBaseUrl });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
    res.json({ apiBaseUrl, leaderboard });
});
app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
    const entry = { id: `entry-${Date.now()}`, ...req.body };
    leaderboard.push(entry);
    res.status(201).json({ message: 'Leaderboard entry created', entry, apiBaseUrl });
});
app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
    res.json({ apiBaseUrl, workouts });
});
app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
    const workout = { id: `workout-${Date.now()}`, ...req.body };
    workouts.push(workout);
    res.status(201).json({ message: 'Workout created', workout, apiBaseUrl });
});
void mongoose
    .connect(mongoUri)
    .then(() => {
    console.log(`MongoDB connected to ${mongoUri}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});

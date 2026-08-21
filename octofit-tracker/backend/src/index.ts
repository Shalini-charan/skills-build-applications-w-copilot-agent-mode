import express from 'express';
import './config/database.js';
import Activity from './models/activity.js';
import LeaderboardEntry from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl });
});

const collectionRoutes = [
  ['users', '/api/users/'],
  ['teams', '/api/teams/'],
  ['activities', '/api/activities/'],
  ['leaderboard', '/api/leaderboard/'],
  ['workouts', '/api/workouts/'],
] as const;

const models = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
};

for (const [resource, path] of collectionRoutes) {
  app.get(path, async (_request, response) => {
    try {
      const data = await models[resource].find().lean();
      response.json({ resource, data });
    } catch (error) {
      console.error(`Error loading ${resource}:`, error);
      response.status(500).json({ resource, error: 'Unable to load data' });
    }
  });
}

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiUrl}`);
});

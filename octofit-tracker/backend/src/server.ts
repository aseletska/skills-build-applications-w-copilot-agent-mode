import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
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
});

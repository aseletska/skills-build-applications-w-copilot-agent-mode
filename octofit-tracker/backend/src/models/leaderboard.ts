import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LeaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', LeaderboardSchema);
export default Leaderboard;

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ActivitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activity = model('Activity', ActivitySchema);
export default Activity;

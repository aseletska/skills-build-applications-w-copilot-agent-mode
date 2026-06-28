import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ExerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    reps: { type: Number },
    sets: { type: Number },
    durationSeconds: { type: Number },
  },
  { _id: false }
);

const WorkoutSchema = new Schema(
  {
    name: { type: String, required: true },
    durationMinutes: { type: Number },
    focus: { type: String },
    exercises: [ExerciseSchema],
  },
  { timestamps: true }
);

const Workout = model('Workout', WorkoutSchema);
export default Workout;

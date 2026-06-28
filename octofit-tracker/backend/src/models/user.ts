import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);
export default User;

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Team = model('Team', TeamSchema);
export default Team;

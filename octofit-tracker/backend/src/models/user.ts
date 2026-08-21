import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profile: {
      avatar: String,
      fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
      goal: { type: String, required: true },
    },
  },
  { timestamps: true, collection: 'users' },
);

export default mongoose.models.User || mongoose.model('User', userSchema);
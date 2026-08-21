import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ name: { type: String, required: true }, sets: Number, reps: Number }],
  },
  { timestamps: true, collection: 'workouts' },
);

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
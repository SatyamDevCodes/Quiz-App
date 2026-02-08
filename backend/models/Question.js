import mongoose from 'mongoose';

export default mongoose.model(
  'Question',
  new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
    category: String,
    difficulty: String
  })
);

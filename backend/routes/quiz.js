import express from 'express';
import jwt from 'jsonwebtoken';
import Question from '../models/Question.js';

const router = express.Router();

const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', isAuth, async (req, res) => {
  const { category, difficulty } = req.query;
  const questions = await Question.find({ category, difficulty });
  res.json(questions);
});

export default router;

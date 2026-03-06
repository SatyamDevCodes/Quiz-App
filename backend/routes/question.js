import express from 'express';
import jwt from 'jsonwebtoken';
import Question from '../models/Question.js';

const router = express.Router();

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', isAdmin, async (_, res) => {
  const questions = await Question.find();
  res.json(questions);
});

router.post('/', isAdmin, async (req, res) => {
  const q = new Question(req.body);
  await q.save();
  res.status(201).json(q);
});

router.put('/:id', isAdmin, async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
});

router.delete('/:id', isAdmin, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;

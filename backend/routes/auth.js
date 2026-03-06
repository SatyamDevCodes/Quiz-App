import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        error:"Email already registered! Please login."
      });
    }

    // if not registered user create new user
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: "Server error! Please try again latter." });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
        // email id check
    const user = await User.findOne({ email });

    if (!user){
      return res.status(401).json({
        error:"Email not found! Please register first"
      });
    } 
    //password match check
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({
        error:"Invalid password! Please try again."
      });
    }
    
    // agar email and password dono sahi hai to
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user:{
        username: user.username,
         role: user.role
      }
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

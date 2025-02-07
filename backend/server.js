const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Workout = require('./models/workoutModel');
const requireAuth = require('./middleware/requireAuth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/workoutdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ error: 'User already exists' });
  }

  const user = new User({ email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yourSuperSecretKey', { expiresIn: '1h' });

  res.status(201).send({ token });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  if (user.password !== password) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yourSuperSecretKey', { expiresIn: '1h' });

  res.status(200).send({ token });
});

app.post('/api/workouts', requireAuth, async (req, res) => {
  const { title, load, reps } = req.body;
  const userId = req.userId;

  const workout = new Workout({ title, load, reps, userId });
  await workout.save();
  res.status(201).send(workout);
});

app.get('/api/workouts', requireAuth, async (req, res) => {
  const userId = req.userId;

  const workouts = await Workout.find({ userId });
  res.status(200).send(workouts);
});

app.delete('/api/workouts/:id', requireAuth, async (req, res) => {
  const userId = req.userId;
  const workoutId = req.params.id;

  const workout = await Workout.findOne({ _id: workoutId, userId });
  if (!workout) {
    return res.status(404).send({ error: 'Workout not found or not authorized' });
  }

  await Workout.deleteOne({ _id: workoutId });
  res.status(200).send({ message: 'Workout deleted' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
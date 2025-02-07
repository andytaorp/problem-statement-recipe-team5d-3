const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Recipe = require('./models/recipeModel');
const requireAuth = require('./middleware/requireAuth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


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

app.post('/api/recipes', requireAuth, async (req, res) => {
  const { name, ingredients, instructions, preptime, difficulty } = req.body;
  const userId = req.userId;

  const recipe = new Recipe({ name, ingredients, instructions, preptime, difficulty, userId });
  await recipe.save();
  res.status(201).send(recipe);
});

app.get('/api/recipes', requireAuth, async (req, res) => {
  const userId = req.userId;

  const recipes = await Recipe.find({ userId });
  res.status(200).send(recipes);
});

app.delete('/api/recipes/:id', requireAuth, async (req, res) => {
  const userId = req.userId;
  const recipeId = req.params.id;

  const recipe = await Recipe.findOne({ _id: recipeId, userId });
  if (!recipe) {
    return res.status(404).send({ error: 'Recipe not found or not authorized' });
  }

  await Recipe.deleteOne({ _id: recipeId });
  res.status(200).send({ message: 'Recipe deleted' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

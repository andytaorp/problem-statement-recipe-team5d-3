const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// Get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 }); // descending order
  res.status(200).json(recipes);
};

// Get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const recipe = await Workout.findById(id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.status(200).json(recipe);
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, instructions, preptime, difficulty } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!ingredients) {
    emptyFields.push("ingredients");
  }
  if (!instructions) {
    emptyFields.push("instructions");
  }
  if (!preptime) {
    emptyFields.push("preptime");
  }
  if (!difficulty) {
    emptyFields.push("difficulty");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const recipe = await Recipe.create({ title, reps, load });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(400).json({ error: "Recipe not found" });
  }
  res.status(200).json(recipe);
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!recipe) {
    return res.status(400).json({ error: "Recipe not found" });
  }
  res.status(200).json(recipe);
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  preptime: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);

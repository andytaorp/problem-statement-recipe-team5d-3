const express = require("express");
const {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// Get all recipes
router.get("/", getRecipes);

// Get a single recipe
router.get("/:id", getRecipe);

// Post a new recipe
router.post("/", createRecipe);

// Delete a recipe
router.delete("/:id", deleteRecipe);

// Update a recipe
router.patch("/:id", updateRecipe);

module.exports = router;

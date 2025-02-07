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


// Get all workouts
router.get("/", getRecipes);

// Get a single workout
router.get("/:id", getRecipe);

// Post a new workout
router.post("/", createRecipe);

// Delete a workout
router.delete("/:id", deleteRecipe);

// Update a workout
router.patch("/:id", updateRecipe);

module.exports = router;
const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Sign-Up Route
router.post("/signup", signupUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;

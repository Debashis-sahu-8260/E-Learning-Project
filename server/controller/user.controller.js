require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model"); // Adjust the path if necessary

// Function to create a new JWT token
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

// GET endpoint for fetching all users
router.get("/signup-popup", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).send(err.message);
  }
});

// DELETE endpoint for deleting a user by ID
router.delete("/signup-popup/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).send(err.message);
  }
});

// POST endpoint for user signup
router.post("/signup-popup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).lean().exec();
    if (existingUser) {
      return res.status(400).send({ message: "Please try another email" });
    }

    const newUser = await User.create(req.body);
    const token = newToken(newUser);
    
    // Set cookie with the JWT token
    res.cookie("Bearer", token, { httpOnly: true });

    return res.status(201).send({ newUser, token });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).send(err.message);
  }
});

// POST endpoint for user login
router.post("/login-popup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = newToken(user);
    res.cookie("Bearer", token, { httpOnly: true });

    return res.status(200).send({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/user");
let app = express.Router();

// Create a new user
app.post("/signup", async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cinema_id: req.body.cinema_id,
      photo: req.body.photo,
    };

    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;

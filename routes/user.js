const express = require("express");
const User = require("../models/user");
const { Protect } = require("../middleware/auth");
let app = express.Router();

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

// get user by ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "User not found", code: 404 });
    } else {
      res.status(200).json({ status: "success", data: user });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update a user by ID
app.patch("/:id", Protect, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ msg: "The user does not exist", code: 404 });

    let data = user._doc;
    user.overwrite({ ...data, ...req.body });
    user.save();

    res.send({ msg: "User updated", data: user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a user by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ msg: "User not found", code: 404 });
    } else {
      await user.deleteOne();
      res.status(200).send({ msg: "User deleted successfully", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

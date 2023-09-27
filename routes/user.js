const express = require("express");
const User = require("../models/user");
const { Protect } = require("../middleware/auth");
let app = express.Router();

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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
    // 1) Create error if user POST's password data
    if (req.body.password) {
      return res.status(400).json({
        msg: "This route is not for password updates. Please use /updateMyPassword.",
      });
    }

    // 2) filter for unwanted field that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email", "photo");

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser)
      return res
        .status(404)
        .json({ msg: "The user does not exist", code: 404 });

    res.status(200).json({ msg: "User updated", data: updatedUser });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a user by ID
app.delete("/:id", Protect, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ msg: "User not found", code: 404 });
    } else {
      await User.findByIdAndUpdate(req.user._id, { active: false });
      res.status(200).json({ msg: "User successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

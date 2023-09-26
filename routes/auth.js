const express = require("express");
const User = require("../models/user");
let app = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token);

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

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
    createSendToken(savedUser, 201, res);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exists
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // 2) Check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({});
  }
});

module.exports = app;

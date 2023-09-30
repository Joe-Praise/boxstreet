const express = require("express");
const fs = require("fs");
const User = require("../models/user");
const Cinema = require("../models/cinema");
const Verification = require("../models/verification");
let app = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sendEmail = require("../utils/email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

require("dotenv").config();
const VERIFICATION_URL =
  process.env.MODE == "PROD"
    ? "https://boxstreet.onrender.com/api/v1/verifications"
    : "http://localhost:5000/api/v1/verifications";

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
  user.active = undefined;

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

    const data = {
      email: userData.email,
      cinema_id: userData.cinema_id,
    };

    axios.post(VERIFICATION_URL, data);

    const user = new User(userData);
    const savedUser = await user.save();

    // Remove password from the output
    savedUser.password = undefined;
    savedUser.active = undefined;

    res.status(201).json({
      status: "success",
      data: {
        savedUser,
      },
    });
    // createSendToken(savedUser, 201, res);
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
      console.log(user);
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// forgot password, password reset and update password

app.post("/forgot-password", async (req, res) => {
  // 1) Get user based on posted email

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.status(400).json({
      msg: "User does not exist!",
    });
  }

  const data = { email, cinema_id: user.cinema_id };

  const response = await axios.post(VERIFICATION_URL, data);
  // const cinema
  // console.log(response.data);
  const message = `Forgot your password? \nHere's your code: ${response.data.code}`;

  // console.log(html);
  // console.log(response.data.code);

  try {
    sendEmail({
      email: response.data.email,
      subject: "Your password reset code (valid for 15 mins)",
      message,
      // html: html,
    });

    res.status(200).json({
      status: "success",
      code: response.data.code,
      message: "Code sent to email",
    });
  } catch (err) {
    // response.code = undefined;
    // response.is_active = false;
    // await response.save({ validateBeforeSave: false });
    console.log(err.message);
    // res.status(500).json({ msg: "There was an error sending the code!" });
  }

  // const user = await User.findOne(email);
  // res.json({
  //   data: {
  //     user
  //   },
  // });
  // 2) Generate random reset token
});

module.exports = app;

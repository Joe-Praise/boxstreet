const express = require("express");
const User = require("../models/user");
const Management = require("../models/management");
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

const forgotPassword = async (email, user, res) => {
  const data = { email, cinema_id: user.cinema_id };

  const response = await axios.post(VERIFICATION_URL, data);
  const responseData = response.data;

  const message = `Forgot your password? \nHere's reset code: ${responseData.code}`;

  sendEmail({
    email: responseData.email,
    subject: "Your password reset code (valid for 15 mins)",
    message,
    // html: html,
  });

  res.status(200).json({
    status: "success",
    code: responseData.code,
    message: "Code sent to email",
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

    const userVerifyInfo = await axios.post(VERIFICATION_URL, data);
    const info = userVerifyInfo.data;
    const message = `Did you just sign up with Box Street? \nHere's your verification code: ${info.code}`;

    const user = new User(userData);
    const savedUser = await user.save();

    // Remove password from the output
    savedUser.password = undefined;
    savedUser.active = undefined;

    sendEmail({
      email: info.email,
      subject: "User validation (valid for 15 mins)",
      message,
      // html: html,
    });

    res.status(201).json({
      status: "success",
      data: {
        savedUser,
      },
    });
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

app.post("/management-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exists
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // 2) Check if user exist && password is correct
    const manager = await Management.findOne({ email }).select("+password");

    if (
      !manager ||
      !(await manager.correctPassword(password, manager.password))
    ) {
      console.log(manager);
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    createSendToken(manager, 200, res);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// user forgot password
app.post("/forgot-password", async (req, res) => {
  try {
    // 1) Get user based on posted email
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return req.status(404).json({
        msg: "User does not exist!",
      });
    }

    forgotPassword(email, user, res);
  } catch (err) {
    res.status(500).json({ msg: "There was an error sending the code!" });
  }
});

// Management forgot password
app.post("/forgot-password/management", async (req, res) => {
  try {
    // 1) Get user based on posted email
    const { email, role } = req.body;
    const user = await Management.findOne({ email, role });

    // console.log(user);

    if (!user) {
      return req.status(404).json({
        msg: "Manager does not exist!",
      });
    }

    // handles sending and saving the verification to
    forgotPassword(email, user, res);
  } catch (err) {
    res.status(500).json({ msg: "There was an error sending the code!" });
  }
});

// User reset password
app.patch("/reset-password", async (req, res) => {
  try {
    let { email, code, password } = req.body;

    let time;
    let verify = await Verification.findOne({ email, code, is_active: true });

    if (!verify) return res.json({ msg: "Invalid code was supplied." });
    if (!verify.is_active) return res.json({ msg: "Code is already expired" });

    time =
      (Date.now() - new Date(verify.created_at).getTime()) / (1000 * 60 * 15);

    if (time > 15) {
      verify.is_active = false;
      verify.save();
      return res.json({ msg: "Code is already expired" });
    }

    // call the user and reset password
    let user = await User.findOne({ email });
    if (user) {
      verify.is_active = false;
      verify.save();

      user.password = password;
      user.save();

      res.json({
        msg: "Password successfully updated!",
      });
    } else {
      res.status(404).json({
        msg: "user does not exist!",
      });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Management reset password
app.patch("/reset-password/management", async (req, res) => {
  try {
    let { email, code, password } = req.body;

    let time;
    let verify = await Verification.findOne({ email, code, is_active: true });

    if (!verify) return res.json({ msg: "Invalid code was supplied." });
    if (!verify.is_active) return res.json({ msg: "Code is already expired" });

    time =
      (Date.now() - new Date(verify.created_at).getTime()) / (1000 * 60 * 15);

    if (time > 15) {
      verify.is_active = false;
      verify.save();
      return res.json({ msg: "Code is already expired" });
    }

    // call the user and reset password
    let manager = await Management.findOne({ email });
    if (manager) {
      verify.is_active = false;
      verify.save();

      manager.password = password;
      manager.save();

      res.json({
        msg: "Password successfully updated!",
      });
    } else {
      res.status(404).json({
        msg: "Manager does not exist!",
      });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = app;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  cinema_id: { type: String, required: true },
  photo: { type: String },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ManagementSchema = new mongoose.Schema({
  branch_id: {
    type: String,
    required: true,
  },
  cinema_id: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["COUNTER", "THEATER", "WEBSITE"],
    uppercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

ManagementSchema.pre("save", async function (next) {
  // Only run this password if the password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

ManagementSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Management = mongoose.model("managements", ManagementSchema);
module.exports = Management;

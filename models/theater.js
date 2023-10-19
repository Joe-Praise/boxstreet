const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema({
  branch_id: {
    type: String,
    required: true,
    ref: "branches",
  },
  name: {
    type: String,
    required: true,
  },
  screen:{
    type:Number,
    default:1
  },
  seat_capacity:{
    type: Number,
    default: 0,
  },
  unavailable_seat: {
    type: Number,
    default: 0,
  },
  available_seat: {
    type: Number,
    default: 0,
  },
  is_available: {
    type: Boolean,
  }
});
const Theater = mongoose.model("theaters", TheaterSchema);
module.exports = Theater;

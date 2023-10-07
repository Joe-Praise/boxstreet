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
  seating_capacity: {
    type: Number,
    required: true,
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
  },
  row: {
    type: Number,
    default: 2,
  },
  column: {
    type: Number,
    default: 2,
  },
  col_matrix_1: {
    type: Array,
  },
  col_matrix_2: {
    type: Array,
  },
});
const Theater = mongoose.model("theaters", TheaterSchema);
module.exports = Theater;

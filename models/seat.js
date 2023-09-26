const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  theather_id: { type: String, required: true, ref: "theaters" },
  branch_id: { type: String, required: true, ref: "branches" },
  category_id: {
    type: String,
    required: true,
    ref: "categories",
  },
  seat_number: { type: String, required: true },
  booked: { type: Boolean, default: false },
  active: { type: Boolean },
});
const Seat = mongoose.model("seats", SeatSchema);
module.exports = Seat;

const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  theater_id: { type: String, required: true, ref: "theaters" },
  branch_id: { type: String, required: true, ref: "branches" },
  category_id: {
    type: String,
    required: true,
    ref: "categories",
  },
  seat_number: { type: String, required: true },
  is_booked: { type: Boolean, default: false },
  active: { type: Boolean },
});


const Seat = mongoose.model("seats", SeatSchema);
module.exports = Seat;

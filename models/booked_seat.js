const mongoose = require("mongoose");

const BookedSeatSchema = new mongoose.Schema({
  theather_id: { type: String, required: true, ref: "theaters" },
  branch_id: { type: String, required: true, ref: "branches" },
  category_id: {
    type: String,
    required: true,
    ref: "categories",
  },
  user_id: { type: String, required: true, ref: "users" },
  movie_id: { type: String, required: true, ref: "movies" },
  seat_number: { type: String, required: true },
  booked: { type: String, required: true },
  schedule_date: { type: Date },
  is_active: { type: Boolean, default: false },
});
const BookedSeat = mongoose.model("bookedseats", BookedSeatSchema);
module.exports = BookedSeat;

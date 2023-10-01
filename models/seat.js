const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  theater_id: { type: String, required: true, ref: "theaters" },

  cinema_id: { type: String, required: true, ref: "cinemas" },

  branch_id: { type: String, required: true, ref: "branches" },
  category_id: {
    type: String,
    required: true,
    ref: "categories",
  },
  seat_number: { type: String, required: true },
  is_booked: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false, select: false },
  active: { type: Boolean },
});

SeatSchema.pre(/^find/, function (next) {
  // hide users with is deleted field set to true
  this.find({ is_deleted: { $eq: false } });
  next();
});

const Seat = mongoose.model("seats", SeatSchema);
module.exports = Seat;

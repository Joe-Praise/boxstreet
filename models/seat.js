const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  theater_id: { type: String, required: true, ref: "theaters" },

  cinema_id: { type: String, required: true },

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
  // hide users with active field set to false
  this.find({ is_booked: { $ne: false } });
  next();
});

const Seat = mongoose.model("seats", SeatSchema);
module.exports = Seat;

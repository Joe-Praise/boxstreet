const mongoose = require("mongoose");

const SeatSchema = {
  no: { type: String },
  price: { type: Number },
};
const BookingSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    required: true,
    ref: "cinemas",
  },
  schedule_id: {
    type: String,
    required: true,
    ref: "schedules",
  },
  user_id: {
    type: String,
    ref: "users",
  },
  theater_id: {
    type: String,
    required: true,
    ref: "theaters",
  },
  branch_id: {
    type: String,
    required: true,
    ref: "branches",
  },
  movie_id: {
    type: String,
    required: true,
    ref: "movies",
  },
  movie_price: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
  },
  counter_id: {
    type: String,
    default: "",
    ref: "managements",
  },
  booking_type: {
    type: String,
    enum: ["ONLINE", "ONSITE"],
    uppercase: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  show_time: {
    type: String,
  },
  seats: {
    type: Array,
    default: [],
  },
  sub_total: {
    type: Number,
  },
  ticket_no: {
    type: String,
    required: true,
    lowercase: true,
  },
  is_checked: {
    type: Boolean,
    default: false,
  },
  checked_in_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("bookings", BookingSchema);
module.exports = Booking;

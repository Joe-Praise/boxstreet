const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    cinema_id: {
        type: String,
        required:true,
        ref: "cinemas"
    },
    schedule_id: {
        type: String,
        required:true,
        ref: "schedules"
    },
    user_id: {
        type: String,
        ref: "users"
    },
    theater_id: {
        type: String,
        required:true,
        ref: "theaters"
    },
    branch_id: {
        type: String,
        required:true,
        ref: "branches"
    },
    movie_id: {
        type: String,
        required:true,
        ref: "movies"
    },
    movie_price: {
        type: Number,
        required:true
    },
    counter_id: {
        type: String,
        default:"",
        ref: "managements"
    },
    booking_type: {
        type: String,
        enum: ["ONLINE", "ONSITE"],
        uppercase: true
    },
    fullname: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    seat_price: {
        type: Number,
        required:true,
    },
    sub_total: {
        type: Number,
    },
    seat_number: {
        type: String,
    },
    ticket_type: {
        type: String,
    },
    ticket_no: {
        type: String,
        required:true,
        lowercase:true
    },
    is_checked: {
        type: Boolean,
        default: false
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
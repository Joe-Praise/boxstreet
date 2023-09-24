const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    cinema_id: {
        type: String,
        required: true,
        ref: "cinemas"
    },

    schedule_id: {
        type: String,
        required: true,
        ref: "schedules"
    },

    user_id: {
        type: String,
        required: true,
        ref: "users"
    },
    theater_id: {
        type: String,
        required: true,
        ref: "theaters"
    },

    movie_id: {
        type: String,
        required: true,
        ref: "movies"
    },

    counter_id: {
        type: String,
        required: true,
        ref: "managements"
    },

    booking_type: {
        type: String,
        enum:["ONLINE","ONSITE"],
        uppercase:true
    },

    fullname: {
        type: String,
        rquired: true,
    },

    phone: {
        type: String,
        rquired: true,
    },

    email: {
        type: String,
        rquired: true,
    },

    price: {
        type: Number,
        rquired: true,
    },

    quantity: {
        type: Number,
        rquired: true,
    },

    sub_total: {
        type: Number,
        rquired: true,
    },

    incentive: {
        type: String,
        rquired: true,
    },

    seat_number: {
        type: String,
        rquired: true,
    },

    ticket_type: {
        type: String,
        rquired: true,
    },

    ticket_no: {
        type: String,
        rquired: true,
    },

    is_checked: {
        type: Boolean,
        default:false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("bookings", BookingSchema);
module.exports = Booking;
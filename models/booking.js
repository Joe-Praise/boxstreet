const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    cinema_id: {
        type: String,
    
        ref: "cinemas"
    },

    schedule_id: {
        type: String,
        
        ref: "schedules"
    },

    user_id: {
        type: String,
        
        ref: "users"
    },
    theater_id: {
        type: String,
        
        ref: "theaters"
    },

    movie_id: {
        type: String,
        
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
        
    },

    phone: {
        type: String,
    
    },

    email: {
        type: String,
        
    },

    price: {
        type: Number,
        
    },

    quantity: {
        type: Number,
        
    },

    sub_total: {
        type: Number,
        
    },

    incentive: {
        type: String,
        
    },

    seat_number: {
        type: String,
        
    },

    ticket_type: {
        type: String,
        
    },

    ticket_no: {
        type: String,
        
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
const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    cinema_id: { type: String, required: true, ref: "cinemas" },
    branch_id: { type: String, required: true, ref: "branches" },
    user_id: { type: String, required: true, ref: "users" },
    comment: { type: String, required: true},
    rating: { type: String },
    date: { type: Date, required: Date.now }
}) 

const Review = mongoose.model("reviews", ReviewSchema)
module.exports = Review
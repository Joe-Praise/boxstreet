const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    cinema_id: { type: String, ref: "cinemas" },
    branch_id: { type: String, ref: "branches" },
    user_id: { type: String, ref: "users" },
    comment: { type: String,},
    rating: { type: String },
    date: { type: Date, default: Date.now },
}) 

const Review = mongoose.model("reviews", ReviewSchema)
module.exports = Review
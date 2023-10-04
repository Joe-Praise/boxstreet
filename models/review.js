const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    cinema_id: { type: String, ref: "cinemas", required: true,},
    branch_id: { type: String, ref: "branches", required: true, },
    user_id: { type: String, ref: "users", required: true, },
    comment: { type: String, required: true,},
    rating: { type: String, required: true,},
    date: { type: Date, default: Date.now },
}) 

const Review = mongoose.model("reviews", ReviewSchema)
module.exports = Review
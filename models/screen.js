const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema({
    theater_id: { type: String, required: true,},
    branch_id: { type: String, required: true},
    cinema_id: { type: String, required: true},
    date_created: { type: Date, default: Date.now },
    status: { type: String, required: true},
    active: {type: Boolean},
})

const Screen = mongoose.model("screens", ScreenSchema);
module.exports = Screen;
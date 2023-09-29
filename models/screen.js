const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema({
  theater_id: { type: String, required: true, ref: "theaters" },
  branch_id: { type: String, required: true, ref: "branches" },
  cinema_id: { type: String, required: true, ref: "cinemas" },
  date_created: { type: Date, default: Date.now },
  status: { type: String, enum: ["Working", "Faulty"], },
  active: { type: Boolean }, //ask about this!!!!!
});

const Screen = mongoose.model("screens", ScreenSchema);
module.exports = Screen;

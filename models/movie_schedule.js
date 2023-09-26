const mongoose = require("mongoose");

const MovieScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: true },
  show_time: { type: Array, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

const MovieSchedule = mongoose.model("movieschedules", MovieScheduleSchema);
module.exports = MovieSchedule;

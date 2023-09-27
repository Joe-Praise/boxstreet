const mongoose = require("mongoose");

const MovieScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  show_time: { type: Array, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

MovieScheduleSchema.pre(/^find/, function (next) {
  // hide movie schedule with active field set to false
  this.find({ active: { $ne: false } });
  next();
});

const MovieSchedule = mongoose.model("movieschedules", MovieScheduleSchema);
module.exports = MovieSchedule;

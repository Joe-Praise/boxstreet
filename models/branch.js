const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    required: true,
    ref: "cinemas",
  },

  location: {
    type: String,
    required: true
  },

  opening: {
    type: String,
    required: true,
  },

  closing: {
    type: String,
    required: true,
  },

  phones: {type:Array},
});

const Branch = mongoose.model("branches", BranchSchema);
module.exports = Branch;

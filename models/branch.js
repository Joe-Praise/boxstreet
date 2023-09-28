const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    ref: "cinemas",
  },

  location: {
    type: String,
  },

  opening: {
    type: String,
  },

  closing: {
    type: String,
  },

  phones: {type:Array},
});

const Branch = mongoose.model("branches", BranchSchema);
module.exports = Branch;

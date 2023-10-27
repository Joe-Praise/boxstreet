const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    ref: "cinemas",
    required: true,
  },

  location_id: {
    type: String,
    ref:"locations", 
    required: true,
  },

  name: {
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

  phones: {
    type:Array,
    required: true,
  },
});

const Branch = mongoose.model("branches", BranchSchema);
module.exports = Branch;

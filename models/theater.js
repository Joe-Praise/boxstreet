const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema({
    branch_id: {
        type: String,
        required: true,
        ref: "branches"
      },
      name: {
        type: String,
        required: true,
        unique: true
      },
      seating_capacity: {
        type: String,
        required: true
      },
      unavailable_seat: {
        type: String,
        required: true
      },
      available_seat: {
        type: String,
        required: true
      },
      theater_availability: {
        type: Boolean
      }
});
const Theater = mongoose.model("theaters", TheaterSchema);
module.exports = Theater;
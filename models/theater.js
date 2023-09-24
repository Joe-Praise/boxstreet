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
      },
      seating_capacity: {
        type: Number,
        required: true
      },
      unavailable_seat: {
        type: Number,
        required: true
      },
      available_seat: {
        type: Number,
        required: true
      },
      is_available: {
        type: Boolean
      }
});
const Theater = mongoose.model("theaters", TheaterSchema);
module.exports = Theater;
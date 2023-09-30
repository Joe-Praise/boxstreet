const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

const Cinema = mongoose.model("cinemas", CinemaSchema);
module.exports = Cinema;

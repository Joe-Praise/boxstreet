const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema({
<<<<<<< Updated upstream
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  image: { type: String }, 
  date_created: { type: Date, default: Date.now }
})
=======
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
    required: true,
  },

  date_created: {
    type: Date,
    default: Date.now 
  },
});
>>>>>>> Stashed changes

const Cinema = mongoose.model("cinemas", CinemaSchema);
module.exports = Cinema;
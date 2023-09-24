const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
<<<<<<< Updated upstream
  name: {
    type: String,
    enum: ["VIP", "VVIP", "REGULAR"],
    required: true,
    uppercase:true,
  },
  price: {
    type: Number,
    required: true,
  },
  cinema_id: {
    type: String,
    required: true,
    ref: "cinemas",
  },
=======
    name: {
      regular: { type: String },
      vip: { type: String },
      vvip: { type: String }
    },
    price: {
      type: String,
      required: true
    },
    cinema_id: {
      type: String,
      required: true,
      ref: "cinemas"
    }
>>>>>>> Stashed changes
});
const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;

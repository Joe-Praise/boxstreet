const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
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
});

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;

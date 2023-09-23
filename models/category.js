const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
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
});
const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
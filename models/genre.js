const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Genre = mongoose.model("genres", GenreSchema);
module.exports = Genre;
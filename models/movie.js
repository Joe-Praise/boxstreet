const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  cinema_id: { type: String, required: true, ref: "cinemas" },
  branch_id: { type: String, required: true, ref: "branches" },
  name: { type: String, required: true },
  film_poster: { type: String, required: true }, //image for the movie
  trailer: { type: String, required: true },
  description: { type: String, required: true }, //synopsis for the movie
  times_showed: { type: Number },
  cast: { type: String, required: true },
  movie_director: { type: String, required: true },
  production_studio: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  language: { type: String, required: true },
  movie_rating: { type: String, required: true },
  pg_rating: { type: String, required: true },
  release_date: { type: String, required: true },
  upload_date: { type: String, default: Date.now },
  active: { type: Boolean },
});

const Movie = mongoose.model("movies", MovieSchema);
module.exports = Movie;

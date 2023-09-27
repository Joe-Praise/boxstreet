const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  cinema_id: { type: String, ref: "cinemas" },
  branch_id: { type: String, ref: "branches" },
  name: { type: String, },
  film_poster: { type: String, }, //image for the movie
  trailer: { type: String },
  description: { type: String, }, //synopsis for the movie
  times_showed: { type: Number },
  cast: { type: String, },
  movie_director: { type: String, },
  production_studio: { type: String,  },
  genre: { type: String, },
  duration: { type: String, },
  language: { type: String, },
  movie_rating: { type: String, },
  pg_rating: { type: String, },
  release_date: { type: String,},
  upload_date: { type: Date, default: Date.now },
  active: { type: Boolean },
});

const Movie = mongoose.model("movies", MovieSchema);
module.exports = Movie;

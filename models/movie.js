const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  cinema_id: { type: String, ref: "cinemas", required: true},
  branch_id: { type: String, ref: "branches", required: true },
  location_id: {type: String, ref: "locations", required: true},
  name: { type: String,required: true },
  image: { type: String},
  trailer: { type: String, required: true},
  description: { type: String, required: true},
  times_showed: { type: Number, required: true},
  cast:{ type:Array, default:[]},
  movie_director: { type: String, required: true},
  production_studio: { type: String, required: true },
  genre: { type: String,required: true },
  duration: { type: String, required: true},
  language: { type: String,required: true },
  movie_rating: { type: String, required: true},
  pg_rating: { type: String, required: true},
  release_date: { type: String,required: true},
  coming_soon: {type: Boolean},
  upload_date: { type: Date, default: Date.now },
  active: { type: Boolean },
});

const Movie = mongoose.model("movies", MovieSchema);
module.exports = Movie;
/*{
    text: { type: String, required: true },
    image: { type: String, required: true },
  }*/
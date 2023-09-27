let Movie = require("../models/movie");
let express = require("express");
let app = express.Router();

//get all movies
app.get("/", async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json({
        status: "success",
        data: movie,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a movie by id
app.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404).json({ message: "Movie not Found", code: 404 });
    } else {
      res.status(200).json(movie);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//create a new movie
app.post("/", async (req, res) => {
  try {
    const movieData = req.body;

    const movie = new Movie(movieData);
    const savedMovie = await movie.save();

    res.status(201).json({
        status: "success",
        data: savedMovie,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//update a movie by id
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie)
      return res
        .status(404)
        .json({ msg: "This Review id does not exist", code: 404 });

    let data = movie._doc;
    movie.overwrite({ ...data, ...req.body });
    movie.save();
    res.send({ msg: "Movie updated successfully", data: movie });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//updated a movie poster
app.put("/:id/resources", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movie.findById(id);

    if (!movie)
      return res.status(404).json({ msg: "The id supplied does not exist", code: 404 });

    res.send({ msg: "Movie updated", data: movie });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//delete a movie
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      res.status(404).json({ msg: "Movie not found", code: 404 });
    } else {
      await movie.deleteOne();
      res
        .status(200)
        .send({ msg: "Movie has been deleted successfully", code: 202 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

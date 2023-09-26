let Movie = require("../models/movie");
let Branch = require("../models/branch");
let Cinema = require("../models/cinema");
let express = require("express");
let app = express.Router();

//get all movies
app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("cinema_id", "branch_id");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a branch by id
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
    const { cinema_id, branch_id } = req.body;

    const cinema = await Cinema.findById(cinema_id);
    const branch = await Branch.findById(branch_id);

    if (!cinema)
      return res.status(404).send({ msg: "Cinema does not exist", code: 404 });
    if (!branch)
      return res.status(404).send({ msg: "Branch does not exist", code: 404 });

    const movie = new Movie(req.body);
    await movie.save();
    res.send(movie);
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
app.delete("/movie/:id", async (req, res) => {
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

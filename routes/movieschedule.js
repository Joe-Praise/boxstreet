const express = require("express");
const MovieSchedule = require("../models/movie_schedule");
let app = express.Router();

// Get all movie schedule
app.get("/", async (req, res) => {
  try {
    const movieschedule = await MovieSchedule.find();
    res.status(200).json({
      status: "success",
      data: movieschedule,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get movie schedule by ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieschedule = await MovieSchedule.findById(id);
    if (!movieschedule) {
      res.status(404).json({ msg: "Movie schedule not found", code: 404 });
    } else {
      res.status(200).json({ status: "success", data: movieschedule });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Create new movie schedule
app.post("/", async (req, res) => {
  try {
    const moviescheduleData = req.body;

    const movieSchedule = new MovieSchedule(moviescheduleData);
    const savedMovieSchedule = await movieSchedule.save();
    res.status(201).json({
      status: "success",
      data: savedMovieSchedule,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a movie schedule by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieschedule = await MovieSchedule.findById(id);

    if (!seat)
      return res
        .status(404)
        .json({ msg: "The movie schedule does not exist", code: 404 });

    let data = movieschedule._doc;
    movieschedule.overwrite({ ...data, ...req.body });
    movieschedule.save();

    res.send({ msg: "Movie schedule details updated", data: movieschedule });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a movie schedule by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieschedule = await MovieSchedule.findById(id);

    if (!movieschedule) {
      res.status(404).json({ msg: "Movie schedule not found", code: 404 });
    } else {
      await seat.deleteOne();
      res
        .status(200)
        .send({ msg: "Movie schedule deleted successfully", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

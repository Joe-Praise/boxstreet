const express = require("express");
const MovieSchedule = require("../models/movie_schedule");
let app = express.Router();

// Get all movie schedule
app.get("/", async (req, res) => {
  try {
    const movieschedule = await MovieSchedule.find();
    console.log(movieschedule);
    res.status(200).json({
      status: "success",
      data: movieschedule,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
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
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Update a movie schedule by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieschedule = await MovieSchedule.findById(id);

    if (!movieschedule)
      return res
        .status(404)
        .json({ msg: "The movie schedule does not exist!", code: 404 });

    req.body.updated_at = Date.now();
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
      // await seat.deleteOne();
      // res
      //   .status(200)
      //   .send({ msg: "Movie schedule deleted successfully", code: 200 });
      await MovieSchedule.findByIdAndUpdate(movieschedule._id, {
        active: false,
      });
      res.status(200).json({ msg: "Movie schedule successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

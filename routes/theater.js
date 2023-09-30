const express = require("express");
const app = express.Router();
const Branch = require("../models/branch");
const Theater = require("../models/theater");
const Seat = require("../models/seat");

// Get all theaters
app.get("/", async (req, res) => {
  try {
    let theaters = await Theater.find().populate("branch_id");
    res.json(theaters);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred", code: 500 });
  }
});

// Get a theater by ID
app.get("/:id", async (req, res) => {
  try {
    const theaterId = req.params.id;
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      res.status(404).json({ message: "Theater not found", code: 404 });
    } else {
      res.status(200).json(theater);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get a seat theater
app.get("/:id/seats", async (req, res) => {
  try {
    const theaterId = req.params.id;
    const theater = await Theater.findById(theaterId);

    if (!theater) {
      res.status(404).json({ message: "Theater not found", code: 404 });
    } else {
      let seats = await Seat.find().populate("category_id");
      res.json(seats);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Create a new theater
app.post("/", async (req, res) => {
  try {
    let { branch_id } = req.body;

    let branch = await Branch.findById(branch_id);

    if (!branch)
      return res.status(404).send({ msg: "Branch does not exist", code: 404 });

    req.body.unavailable_seat = 0;
    req.body.available_seat = req.body.seating_capacity;

    let theater = new Theater(req.body);
    await theater.save();
    res.send(theater);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Create a new theater
app.post("/reset-seats", async (req, res) => {
  try {
    let { theater_id } = req.body;

    let theater = await Theater.findById(theater_id);

    if (!theater)
      return res.status(404).send({ msg: "Theater does not exist", code: 404 });

    theater.unavailable_seat = 0;
    theater.available_seat = theater.seating_capacity;
    theater.is_available = true;

    await Seat.updateMany({ theater_id }, { is_booked: false });
    await theater.save();

    res.send(theater);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Update a theater by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const theater = await Theater.findById(id);

    if (!theater)
      return res
        .status(404)
        .json({ msg: "The id supplied does not exist", code: 404 });

    let data = theater._doc;
    theater.overwrite({ ...data, ...req.body });
    theater.save();

    res.send({ msg: "theater updated", data: theater });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a theater by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const theater = await Theater.findById(id);

    if (!theater) {
      res.status(404).json({ msg: "theater not found", code: 404 });
    } else {
      await theater.deleteOne();
      res.status(200).send({ msg: "theater deleted successfully", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

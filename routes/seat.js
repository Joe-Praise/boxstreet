const express = require("express");
const Seat = require("../models/seat");
const Theater = require("../models/theater");
let app = express.Router();

// Get all seats
app.get("/", async (req, res) => {
  try {
    const seat = await Seat.find().populate(
      "theater_id branch_id category_id cinema_id"
    );
    res.status(200).json({
      status: "success",
      data: seat,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// get seats by ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findById(id).populate(
      "theater_id branch_id category_id"
    );
    if (!seat) {
      res.status(404).json({ msg: "Seat not found!", code: 404 });
    } else {
      res.status(200).json({ status: "success", data: seat });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Create new seat seat
app.post("/", async (req, res) => {
  try {
    const seatData = req.body;

    const seat = new Seat(seatData);
    const savedSeat = await seat.save();
    const theater = await Theater.findById(req.body.theater_id);

    theater.seat_capacity++;
    await theater.save();

    res.status(201).json({
      status: "success",
      data: savedSeat,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Update a seat by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findById(id);

    if (!seat)
      return res
        .status(404)
        .json({ msg: "The seat does not exist", code: 404 });

    let data = seat._doc;
    seat.overwrite({ ...data, ...req.body });
    seat.save();

    res.send({ msg: "Seat details updated", data: seat });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a seat by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findById(id);

    if (!seat) {
      res.status(404).json({ msg: "Seat not found", code: 404 });
    } else {
      // await seat.deleteOne();
      // res.status(200).send({ msg: "seat deleted successfully", code: 200 });
      await Seat.findByIdAndUpdate(seat._id, { is_deleted: true });
      await seat.save();

      res.status(200).json({ msg: "Seat successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

const express = require("express");
const BookedSeat = require("../models/booked_seat");
let app = express.Router();

// Get all booked seat
app.get("/", async (req, res) => {
  try {
    const bookedseat = await BookedSeat.find();
    // .populate(
    //   "theather_id branch_id category_id user_id ['name', 'email', 'cinema_id','created_at'] movie_id"
    // );
    res.status(200).json({
      status: "success",
      data: bookedseat,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get booked seat by ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookedseat = await BookedSeat.findById(id);
    // .populate(
    //   "theather_id branch_id category_id user_id ['name', 'email', 'cinema_id','created_at'] movie_id"
    // );
    if (!bookedseat) {
      res.status(404).json({ msg: "Seat not found!", code: 404 });
    } else {
      res.status(200).json({ status: "success", data: bookedseat });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Create new booked seat
app.post("/", async (req, res) => {
  try {
    const bookedseatData = req.body;

    const bookedseat = new BookedSeat(bookedseatData);
    const savedBookedSeat = await bookedseat.save();
    res.status(201).json({
      status: "success",
      data: savedBookedSeat,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a booked seat by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookedseat = await BookedSeat.findById(id);

    if (!bookedseat)
      return res
        .status(404)
        .json({ msg: "The seat does not exist.", code: 404 });

    let data = bookedseat._doc;
    bookedseat.overwrite({ ...data, ...req.body });
    bookedseat.save();

    res.send({ msg: "Seat details updated", data: bookedseat });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a booked seat by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookedseat = await BookedSeat.findById(id);

    if (!bookedseat) {
      res.status(404).json({ msg: "Seat not found", code: 404 });
    } else {
      // await bookedseat.deleteOne();
      // res.status(200).send({ msg: "seat deleted successfully", code: 200 });
      await BookedSeat.findByIdAndUpdate(bookedseat._id, { is_active: false });
      res.status(200).json({ msg: "Booked seat successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

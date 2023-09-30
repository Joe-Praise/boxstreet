const express = require("express");
const Booking = require("../models/booking");
const Seat = require("../models/seat");
let app = express.Router();

// get all bookings
app.get("/", async (req, res) => {
  let bookings;
  try {
    bookings = await Booking.find();
  } catch (error) {
    res.status(500).json({ error: err.message })
  }
  if (!bookings) {
    return res.status(404).json("No Bookings Yet")
  }
  return res.status(200).json(bookings)
});

// get a single booking
app.get("/:id", async (req, res) => {

  let booking;
  try {
    booking = await Booking.findById(req.params.id);
  } catch (err) {
    console.log(err)
  }
  if (!booking) {
    return res.status(400).json("booking not found")
  }
  return res.status(200).json(booking)
});

// get a single booking
app.get("/:id/ticket-no", async (req, res) => {

  let booking;
  let ticket_no = req.params.id;
  try {
    booking = await Booking.findOne({ticket_no});
  } catch (err) {
    console.log(err)
  }
  if (!booking) {
    return res.status(404).json({msg:"Invalid ticket no was passed"})
  }
  return res.status(200).json(booking)
});

// make bookings
app.post("/", async (req, res) => {
  try {
    
    let {seat_number,booking_type,theater_id} = req.body;
    let code = Date.now().toString("36");
    let seat = await Seat.findOne({seat_number,branch_id,theater_id})
    
    req.body.ticket_no = seat_number+code;
    
    if(booking_type.toUpperCase() == "ONLINE"){
      req.body.counter_id = "";
    }
    if(seat.is_booked) return res.json({msg:"Seat has already been booked"})
    
    seat.is_booked = true;

    const booking = new Booking(req.body);

    await booking.save();
    await seat.save();


    res.status(200).json(booking);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }

});


// updating Booking
app.put("/:id", async (req, res) => {
  const { fullname, email, phone, quantity, seat_number } = req.body;
  const bookingId = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndUpdate(bookingId, {
      $set: req.body
    }, { new: true });
  } catch (error) {
    console.log(error)
  }
  if (!booking) {
    return res.status(500).json({ msg: "Unable to Update booking.", code: 500 })
  }
  return res.status(200).json(booking);
});

// get a single booking
app.put("/check-in", async (req, res) => {

  let booking;
  let {status,ticket_no} = req.body
  try {

    booking = await Booking.findOne({ticket_no});
    booking.checked_in_at = Date.now();
    booking.is_checked = status;

  } catch (err) {
    console.log(err)
  }
  if (!booking) {
    return res.status(404).json({msg:"Invalid ticket no was passed"})
  }
  return res.status(200).json(booking)
});

// deleting booking by id
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booked = await Booking.findById(id);

    if (!booked) {
      res.status(404).json({ msg: "Booking not found", code: 404 });
    } else {
      await booked.deleteOne();
      res.status(200).json({ msg: "Booking deleted", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;
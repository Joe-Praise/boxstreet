const express = require("express");
const Booking = require("../models/booking");
let app = express.Router();

// get all bookings
app.get("/getall", async(req, res)=>{
  let bookings;
  try {
    bookings = await Booking.find(); 
  } catch (error) {
  res.status(500).json({error: err.message})
  }
   if(!bookings){
     return res.status(404).json("No Bookings Yet")
   }
   return res.status(200).json(bookings)
 });


// get a single booking
app.get("/:id", async (req, res) => {

  let booking;
  try {
     booking = await Booking.findById(req.params.id);
  } catch (error) {
     console.log(error)
  }
  if (!booking) {
     return res.status(400).json("booking not found")
  }
  return res.status(200).json(booking)
});


// updating Booking
 app.put("/:id", async (req, res) => {
  const { fullname, email, phone, quantity,seat_number } = req.body;
  const bookingId = req.params.id;
  let booking;
  try {
     booking= await Booking.findByIdAndUpdate(bookingId, {
        $set: req.body
     }, {new:true});
  } catch (error) {
     console.log(error)
  }
  if (!booking) {
     return res.status(500).json({ msg: "Unable to Update booking.", code: 500 })
  }
  return res.status(200).json(booking);
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


  // make bookings
  app.post("/booking" , async(req, res)=>{
    try {
        const bookings = req.body;
        const booked = new Booking(bookings);
        const savedBokings = await booked.save();
       res.status(200).json(savedBokings)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    
    } );


    module.exports =app;
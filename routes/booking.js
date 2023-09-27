const express = require("express");
const Booking = require("../models/booking");
let app = express.Router();

// get all bookings
app.get("/", async(req, res)=>{
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


  // make bookings
  app.post("/" , async(req, res)=>{
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
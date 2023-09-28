const express = require("express");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express.Router();
const Cinema = require("../models/cinema");
require("dotenv").config();

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});

// Get all cinemas
app.get("/", async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a cinema by ID
app.get("/:id", async (req, res) => {
  try {
    const cinemaId = req.params.id;
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      res.status(404).json({ msg: "Cinema not found", code: 404 });
    } else {
      res.status(200).json(cinema);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Create a new cinema
app.post("/", async (req, res) => {
  try {
    const cinemaData = req.body;
    const cinema = new Cinema(cinemaData);
    const savedCinema = await cinema.save();
    res.status(201).json(savedCinema);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a cinema by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);

    if (!cinema)
      return res
        .status(404)
        .json({ msg: "The id supplied does not exist", code: 404 });

    cinema.set({ ...req.body }); // Use set() to update document properties
    const updatedCinema = await cinema.save();

    res.status(200).json({ msg: "Cinema updated", data: updatedCinema });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Upload image for cinema
app.post("/:id/resources", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);

    if (!cinema)
      return res.status(404).json({ msg: "The id supplied does not exist", code: 404 });

    if (!req.file)
      return res.status(400).json({ msg: "No file uploaded", code: 400 });

    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Upload failed' });
      }
      res.json({ imageUrl: result.secure_url });
    });

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a cinema by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);

    if (!cinema) {
      res.status(404).json({ msg: "Cinema not found", code: 404 });
    } else {
      await cinema.deleteOne();
      res.status(200).json({ msg: "Cinema deleted successfully", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;


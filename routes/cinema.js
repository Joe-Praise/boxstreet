const express = require("express");
let app = express.Router();
const Cinema = require("../models/cinema");

// / Get all cinemas
app.get("/", async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// / Get a cinema by ID
app.get("/:id", async (req, res) => {
  try {
    const cinemaId = req.params.id;
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      res.status(404).json({ msg: "Cinema not found", code:404 });
    } else {
      res.status(200).json(cinema);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// / Create a new cinema
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

// / Update a cinema by ID
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);

    if (!cinema)
      return res.status(404).json({ msg: "The id supplied does not exist",code:404 });

    let data = cinema._doc;
    cinema.overwrite({ ...data, ...req.body }); 
    cinema.save();

    res.send({ msg: "Cinema updated", data: cinema });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// / Upload image for cinema
app.put("/:id/resources", async (req, res) => {
	try {
	  const { id } = req.params;
	  const cinema = await cinema.findById(id);
  
	  if (!cinema)
		return res.status(404).json({ msg: "The id supplied does not exist",code:404 });
  
	//   let data = cinema._doc;
	//   cinema.overwrite({ ...data, ...req.body }); 
	//   cinema.save();
  
	  res.send({ msg: "Cinema updated", data: cinema });
	} catch (err) {
	  res.status(500).json({ err: err.message });
	}
  });

// / Delete a cinema by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);

    if (!cinema) {
      res.status(404).json({ msg: "Cinema not found",code:404 });
    } else {
      await cinema.deleteOne();
      res.status(200).send({msg:"Cinema deleted successfully",code:200});
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

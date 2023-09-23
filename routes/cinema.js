let Cinema = require('../models/cinema')


// Create a new cinema
app.post('/cinema', async (req, res) => {
	try {
	  const cinemaData = req.body;
	  const cinema = new Cinema(cinemaData);
	  const savedCinema = await cinema.save();
	  res.status(201).json(savedCinema);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  });
  
  // Get all cinemas
  app.get('/cinemas', async (req, res) => {
	try {
	  const cinemas = await Cinema.find();
	  res.status(200).json(cinemas);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // Get a cinema by ID
  app.get('/cinema/:id', async (req, res) => {
	try {
	  const cinemaId = req.params.id;
	  const cinema = await Cinema.findById(cinemaId);
	  if (!cinema) {
		res.status(404).json({ message: 'Cinema not found' });
	  } else {
		res.status(200).json(cinema);
	  }
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // Update a cinema by ID
  app.put('/cinema/:id', async (req, res) => {
	try {
	  const cinemaId = req.params.id;
	  const updatedData = req.body;
	  const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, updatedData, { new: true });
	  if (!updatedCinema) {
		res.status(404).json({ message: 'Cinema not found' });
	  } else {
		res.status(200).json(updatedCinema);
	  }
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // Delete a cinema by ID
  app.delete('/cinema/:id', async (req, res) => {
	try {
	  const cinemaId = req.params.id;
	  const deletedCinema = await Cinema.findByIdAndRemove(cinemaId);
	  if (!deletedCinema) {
		res.status(404).json({ message: 'Cinema not found' });
	  } else {
		res.status(204).send();
	  }
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  



module.exports = app
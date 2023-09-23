let Theater = require('../models/theater')

// Create a new theater
app.post('/theater', async (req, res) => {
    try {
      const theaterData = req.body;
      const theater = new Theater(theaterData);
      const savedTheater = await theater.save();
      res.status(201).json(savedTheater);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all theaters
  app.get('/theaters', async (req, res) => {
    try {
      const theaters = await Theater.find();
      res.status(200).json(theaters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a theater by ID
  app.get('/theater/:id', async (req, res) => {
    try {
      const theaterId = req.params.id;
      const theater = await Theater.findById(theaterId);
      if (!theater) {
        res.status(404).json({ message: 'Theater not found' });
      } else {
        res.status(200).json(theater);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a theater by ID
  app.put('/theater/:id', async (req, res) => {
    try {
      const theaterId = req.params.id;
      const updatedData = req.body;
      const updatedTheater = await Theater.findByIdAndUpdate(theaterId, updatedData, { new: true });
      if (!updatedTheater) {
        res.status(404).json({ message: 'Theater not found' });
      } else {
        res.status(200).json(updatedTheater);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a theater by ID
  app.delete('/theater/:id', async (req, res) => {
    try {
      const theaterId = req.params.id;
      const deletedTheater = await Theater.findByIdAndRemove(theaterId);
      if (!deletedTheater) {
        res.status(404).json({ message: 'Theater not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
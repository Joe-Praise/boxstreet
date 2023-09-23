let Event = require('../models/event')



// Create a new event
app.post('/event', async (req, res) => {
    try {
      const eventData = req.body;
      const event = new Event(eventData);
      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all events
  app.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get an event by ID
  app.get('/event/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.status(200).json(event);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update an event by ID
  app.put('/event/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedData = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
      if (!updatedEvent) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.status(200).json(updatedEvent);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete an event by ID
  app.delete('/event/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const deletedEvent = await Event.findByIdAndRemove(eventId);
      if (!deletedEvent) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
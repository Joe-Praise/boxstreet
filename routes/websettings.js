let Websetting = require('../models/websetting')


// Create a new websetting
app.post('/Websetting', async (req, res) => {
    try {
      const websettingData = req.body;
      const websetting = new Websetting(websettingData);
      const savedWebsetting = await websetting.save();
      res.status(201).json(savedWebsetting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get the websettings
  app.get('/Websettings', async (req, res) => {
    try {
      const websettings = await Websetting.find();
      res.status(200).json(websettings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update the websettings
  app.put('/Websetting', async (req, res) => {
    try {
      const websettingData = req.body;
      const websetting = await Websetting.findOneAndUpdate({}, websettingData, { new: true, upsert: true });
      if (!websetting) {
        res.status(404).json({ message: 'Websetting not found' });
      } else {
        res.status(200).json(websetting);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
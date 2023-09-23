let Verification = require('../models/verification')



// Create a new verification
app.post('/verification', async (req, res) => {
    try {
      const verificationData = req.body;
      const verification = new Verification(verificationData);
      const savedVerification = await verification.save();
      res.status(201).json(savedVerification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all verifications
  app.get('/verifications', async (req, res) => {
    try {
      const verifications = await Verification.find();
      res.status(200).json(verifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a verification by ID
  app.get('/verification/:id', async (req, res) => {
    try {
      const verificationId = req.params.id;
      const verification = await Verification.findById(verificationId);
      if (!verification) {
        res.status(404).json({ message: 'Verification not found' });
      } else {
        res.status(200).json(verification);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a verification by ID
  app.put('/verification/:id', async (req, res) => {
    try {
      const verificationId = req.params.id;
      const updatedData = req.body;
      const updatedVerification = await Verification.findByIdAndUpdate(
        verificationId,
        updatedData,
        { new: true }
      );
      if (!updatedVerification) {
        res.status(404).json({ message: 'Verification not found' });
      } else {
        res.status(200).json(updatedVerification);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a verification by ID
  app.delete('/verification/:id', async (req, res) => {
    try {
      const verificationId = req.params.id;
      const deletedVerification = await Verification.findByIdAndRemove(verificationId);
      if (!deletedVerification) {
        res.status(404).json({ message: 'Verification not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
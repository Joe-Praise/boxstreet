const express = require('express');
let app = express.Router();
const Cinema = require('../models/cinema')
let Verification = require('../models/verification')


  // Get all verifications
  app.get('/verifications', async (req, res) => {
    try{
      let verifications = await verifications.find().populate("cinema_id")
      res.json(verifications)
    }catch(e){}
  });

// Create a new verification
app.post('/verification', async (req, res) => {
  try {
    let {cinema_id} = req.body;

    let cinema = await Cinema.findById(cinema_id)

    if(!cinema) return res.status(404).send({msg:"Cinema does not exist"})
   
    let verification = new Verification(req.body);
  await verification.save();
  res.send(verification);

    } catch (error) {
      res.status(400).json({ error: error.message });
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
      const {id} = req.params;
      const verification = await Verification.findById(id);
  
      if(!verification) return res.status(404).json({msg:"The id supplied does not exist"})
     
      let data = verification._doc;
      verification.overwrite({...data,...req.body})
      verification.save()
  
    res.send({msg:"verification updated",data:verification})
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a verification by ID
  app.delete('/verification/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const verification = await Verification.findById(id);
  
      if (!verification) {
        res.status(404).json({ message: "verification not found" });
      } else {
          await verification.remove();
          res.status(200).send("verification deleted successfully");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
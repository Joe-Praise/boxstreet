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

   // Get a verification by ID
   app.get('/verifications/:id', async (req, res) => {
    try {
      const verificationId = req.params.id;
      const verification = await Verification.findById(verificationId);
      if (!verification) {
        res.status(404).json({ msg: 'Verification not found', code:404 });
      } else {
        res.status(200).json(verification);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

// Create a new verification
app.post('/verifications', async (req, res) => {
  try {
    let {cinema_id} = req.body;

    let cinema = await Cinema.findById(cinema_id)

    if(!cinema) return res.status(404).send({msg:"Cinema does not exist", code:404})
   
    let verification = new Verification(req.body);
  await verification.save();
  res.send(verification);

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });
  
  // Update a verification by ID
  app.put('/verifications/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const verification = await Verification.findById(id);
  
      if(!verification) return res.status(404).json({msg:"The id supplied does not exist", code:404})
     
      let data = verification._doc;
      verification.overwrite({ ...data, ...req.body})
      verification.save()
  
    res.send({msg:"verification updated",data:verification})
  
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Delete a verification by ID
  app.delete('/verifications/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const verification = await Verification.findById(id);
  
      if (!verification) {
        res.status(404).json({ message: "verification not found",code:404 });
      } else {
          await verification.deleteOne();
          res.status(200).send({msg:"verification deleted successfully", code:200});
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


module.exports = app
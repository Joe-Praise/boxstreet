const express = require('express');
let app = express.Router();
let Websetting = require('../models/websetting')


  // Get the websettings
  app.get('/Websettings', async (req, res) => {
    try {
      const websettings = await Websetting.find();
      res.status(200).json(websettings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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
    
  // Update the websettings
  app.put('/Websetting', async (req, res) => {
    try {
      const {id} = req.params;
      const Websetting = await Websetting.findById(id);
  
      if(!Websetting) return res.status(404).json({msg:"The id supplied does not exist", code:404})
     
      let data = Websetting._doc;
      Websetting.overwrite({...data,...req.body})
      Websetting.save()
  
    res.send({msg:"Websetting updated",data:Websetting})

    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


   // Delete a websettings by ID
   app.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const websettings = await Websettings.findById(id);
  
      if (!websettings) {
        res.status(404).json({ message: "websettings not found",code:404 });
      } else {
          await websettings.deleteOne();
          res.status(200).send({msg:"websettings deleted successfully", code:200});
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


module.exports = app
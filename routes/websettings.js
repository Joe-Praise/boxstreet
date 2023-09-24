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
  
      if(!Websetting) return res.status(404).json({msg:"The id supplied does not exist"})
     
      let data = Websetting._doc;
      Websetting.overwrite({...data,...req.body})
      Websetting.save()
  
    res.send({msg:"Websetting updated",data:Websetting})

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
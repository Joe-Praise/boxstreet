const express = require('express');
let app = express.Router();
const Branch = require('../models/branch');
let Theater = require('../models/theater')


  // Get all theaters
  app.get('/theaters', async (req, res) => {
    try {
      let theaters = await theaters.find().populate("branch_id")
      res.json(theaters)
    }catch(e){}
  });

// Create a new theater
app.post('/theater', async (req, res) => {
  
      try {
        let {branch_id} = req.body;
  
        let branch = await Branch.findById(branch_id)
    
        if(!branch) return res.status(404).send({msg:"Branch does not exist"})
       
        let theater = new Theater(req.body);
      await theater.save();
      res.send(theater);
  
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      const {id} = req.params;
      const theater = await Theater.findById(id);
  
      if(!theater) return res.status(404).json({msg:"The id supplied does not exist"})
     
      let data = theater._doc;
      theater.overwrite({...data,...req.body})
      theater.save()
  
    res.send({msg:"theater updated",data:theater})

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a theater by ID
  app.delete('/theater/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const theater = await Theater.findById(id);
  
      if (!theater) {
        res.status(404).json({ message: "theater not found" });
      } else {
          await theater.remove();
          res.status(200).send("theater deleted successfully");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
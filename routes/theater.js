const express = require('express');
let app = express.Router();
const Branch = require('../models/branch');
let Theater = require('../models/theater')


  // Get all theaters
  app.get('/', async (req, res) => {
    try {
      let theaters = await theaters.find().populate("branch_id theater_id")
      res.json(theaters)
    }catch(e){}
  });

   // Get a theater by ID
   app.get('/:id', async (req, res) => {
    try {
      const theaterId = req.params.id;
      const theater = await Theater.findById(theaterId);
      if (!theater) {
        res.status(404).json({ message: 'Theater not found',code:404 });
      } else {
        res.status(200).json(theater);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

// Create a new theater
app.post('/', async (req, res) => {
  
      try {
        let {branch_id} = req.body;
  
        let branch = await Branch.findById(branch_id)
    
        if(!branch) return res.status(404).send({msg:"Branch does not exist",code:404 })
       
        let theater = new Theater(req.body);
      await theater.save();
      res.send(theater);
  
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });
   
  // Update a theater by ID
  app.put('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const theater = await Theater.findById(id);
  
      if(!theater) return res.status(404).json({msg:"The id supplied does not exist", code:404 })
     
      let data = theater._doc;
      theater.overwrite({...data, ...req.body})
      theater.save()
  
    res.send({msg:"theater updated", data:theater})

    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Delete a theater by ID
  app.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const theater = await Theater.findById(id);
  
      if (!theater) {
        res.status(404).json({ msg: "theater not found",code:404 });
      } else {
          await theater.deleteOne();
          res.status(200).send({msg: "theater deleted successfully", code:200});
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


module.exports = app
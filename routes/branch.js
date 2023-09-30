const express = require('express');
const app = express.Router();
const Branch = require('../models/branch');
const Cinema = require('../models/cinema');
const Location = require('../models/location')


// Get all branches
app.get("/", async (req, res) =>{
	try{
		const branches = await Branch.find().populate("cinema_id");
		res.json(branches);
	} catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Create a new branch
app.post("/", async (req, res) => {
  try {
    const {cinema_id} = req.body;

    let cinema = await Cinema.findById(cinema_id)

    if(!cinema) return res.status(404).send({msg:"Cinema does not exist", code:404});

    let branch = new Branch(req.body);
		await branch.save();
		res.send(branch);
        
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get a branch by ID
app.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const branch = await Branch.findById(id);

    if (!branch) {
      res.status(404).json({ msg: "Branch not found" });
    } else {
      res.status(200).json(branch);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update a branch by ID
app.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const branch = await Branch.findById(id);

    if(!branch) 
      return res.status(404).json({msg:"The id supplied does not exist", code:404});

    let data = branch._doc;
    branch.overwrite({...data,...req.body})
    branch.save()
  
    res.send({msg:"branch updated",data: branch});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a branch by ID
app.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const branch = await Branch.findById(id);

    if (!branch) {
      res.status(404).json({ msg: "Branch not found", code:404 });
    } else {
        await branch.deleteOne();
        res.status(200).send({msg: "Branch deleted successfully", code:200});
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Get all branches in a particular location
app.get("/cinemabranches", async (req, res) => {
  try{
    const cinemaId = await Location.find().populate("location_id")
    console.log(cinemaId)
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;

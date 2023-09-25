const express = require('express');
let app = express.Router();
const Branch = require('../models/branch');
const Cinema = require('../models/cinema')


// Get all branches
app.get("/", async function(req,res){
	try{
		let branches = await Branch.find().populate("cinema_id")
		res.json(branches)
	}catch(e){}
});

// Create a new branch
app.post("/", async (req, res) => {
  try {
    let {cinema_id} = req.body;

    let cinema = await Cinema.findById(cinema_id)

    if(!cinema) return res.status(404).send({msg:"Cinema does not exist"})

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
    const branchId = req.params.id;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      res.status(404).json({ message: "Branch not found" });
    } else {
      res.status(200).json(branch);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a branch by ID
app.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const branch = await Branch.findById(id);

    if(!branch) return res.status(404).json({msg:"The id supplied does not exist"})

    let data = branch._doc;
    branch.overwrite({...data,...req.body})
    branch.save()
  
    res.send({msg:"branch updated",data:branch})
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
      res.status(404).json({ message: "Branch not found" });
    } else {
        await branch.remove();
        res.status(200).send("Branch deleted successfully");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

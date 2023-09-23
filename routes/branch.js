let Branch = require('../models/branch')


// Create a new branch
app.post("/branch", (req, res) => {
    const branchData = req.body;
    const branch = new Branch(branchData);
  
    branch.save((err, savedBranch) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(201).json(savedBranch);
      }
    });
  });
  
  // Get all branches
  app.get("/branches", (req, res) => {
    Branch.find({}, (err, branches) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(branches);
      }
    });
  });
  
  // Get a branch by ID
  app.get("/branch/:id", (req, res) => {
    const branchId = req.params.id;
    Branch.findById(branchId, (err, branch) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!branch) {
          res.status(404).json({ message: "Branch not found" });
        } else {
          res.status(200).json(branch);
        }
      }
    });
  });
  
  // Update a branch by ID
  app.put("/branch/:id", (req, res) => {
    const branchId = req.params.id;
    const updatedData = req.body;
  
    Branch.findByIdAndUpdate(branchId, updatedData, { new: true }, (err, updatedBranch) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!updatedBranch) {
          res.status(404).json({ message: "Branch not found" });
        } else {
          res.status(200).json(updatedBranch);
        }
      }
    });
  });
  
  // Delete a branch by ID
  app.delete("/branch/:id", (req, res) => {
    const branchId = req.params.id;
    Branch.findByIdAndRemove(branchId, (err, deletedBranch) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!deletedBranch) {
          res.status(404).json({ message: "Branch not found" });
        } else {
          res.status(204).send();
        }
      }
    });
  });


  module.exports = app
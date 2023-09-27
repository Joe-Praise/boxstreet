const express = require('express');
let app = express.Router();
const Cinema = require('../models/cinema')
let Category = require('../models/category')


  // Get all categories
  app.get("/categories", async function(req,res){
    try{
      let categories = await categories.find().populate("cinema_id")
      res.json(categories)
    }catch(e){}
  });

// Create a new category
app.post("/", async (req, res) => {
    try {
      const {cinema_id} = req.body;

      let cinema = await Cinema.findById(cinema_id)
  
      if(!cinema) return res.status(404).send({msg:"Cinema does not exist"})
     
      let category = new Category(req.body);
		await category.save();
		res.send(category);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  // Get a category by ID
  app.get("/category/:id", async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a category by ID
  app.put("/category/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.findById(id);
  
      if(!category) return res.status(404).json({msg:"The id supplied does not exist"})
     
      let data = category._doc;
      category.overwrite({...data,...req.body})
      category.save()
  
    res.send({msg:"category updated",data:category})
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a category by ID
  app.delete("/category/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.findById(id);
  
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
          await category.remove();
          res.status(200).send("Category deleted successfully");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = app
let Category = require('../models/category')



// Create a new category
app.post("/category", async (req, res) => {
    try {
      const categoryData = req.body;
      const category = new Category(categoryData);
      const savedCategory = await category.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all categories
  app.get("/categories", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      const categoryId = req.params.id;
      const updatedData = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedData,
        { new: true }
      );
      if (!updatedCategory) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json(updatedCategory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a category by ID
  app.delete("/category/:id", async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await Category.findByIdAndRemove(categoryId);
      if (!deletedCategory) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = app
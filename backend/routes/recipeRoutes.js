const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Add a recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
});

// Update a recipe
router.put('/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recipe);
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted' });
});

module.exports = router;
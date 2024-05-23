const express = require('express');
const RecipesModel = require('../models/Recipes');
const mongoose = require('mongoose');

const router = express.Router();

// GET route to retrieve all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await RecipesModel.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to create a new recipe
router.post('/', async (req, res) => {
    const recipe = new RecipesModel(req.body);
    try {
        const savedRecipe = await recipe.save();
        res.status(200).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const recipe = await RecipesModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipe.push(recipe);
        await user.save();
        res.status(200).json({savedRecipes : user.savedRecipes});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

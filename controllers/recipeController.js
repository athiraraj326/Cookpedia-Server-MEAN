const recipes = require('../models/recipeModal')

// get all recipes
exports.getAllRecipeController = async (req, res) => {
    console.log("Inside getAllRecipeController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get Recipe - authorised user
exports.getARecipeController = async (req, res) => {
    // get dynamic values from url
    const { id } = req.params

    try {
        const recipeDetails = await recipes.findById({ _id: id })
        res.status(200).json(recipeDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

// related recipe
exports.relatedRecipeController = async (req, res) => {
    console.log("Inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(allRelatedRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

// addRecipe
exports.addRecipeController = async (req, res) => {
    console.log("Inside addRecipeController");
    // get all data from req body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    try {
        // check recipe already in modal
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            // recipe already exist
            res.status(406).json("Recipe already exist in our collection!!! Add another...") 
        }else{
            // recipe not in modal then insert the recipe
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// update recipe
exports.updateRecipeController = async (req,res)=>{
    console.log("Inside updateRecipeController");
    const {id} = req.params
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    try{
        // update recipe
        const updatedRecipe = await recipes.findByIdAndUpdate({_id:id},{
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
        },{new:true})
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)
    }catch (err) {
        res.status(401).json(err)
    }
}

// delete Recipe
exports.removeRecipeController = async (req,res)=>{
    console.log("Inside removeRecipeController");
    // get recipe id
    const {id} = req.params
    // remove recipe from model
    try{
        const removeRecipe = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    }catch (err) {
        res.status(401).json(err)
    }
}
import { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList({ fetchTrigger }) {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Cannot fetch recipes. Make sure backend is running!");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Cannot delete recipe. Make sure backend is running!");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchTrigger]);

  return (
    <div>
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Steps:</strong> {recipe.steps}</p>
          <button className="delete-btn" onClick={() => deleteRecipe(recipe._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;

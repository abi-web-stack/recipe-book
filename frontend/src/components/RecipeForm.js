import { useState } from 'react';
import axios from 'axios';

function RecipeForm({ fetchRecipes }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ingredientArray = ingredients.split(',').map(item => item.trim());

      await axios.post('http://localhost:5000/api/recipes', {
        title,
        ingredients: ingredientArray,
        steps
      });

      // Clear form after submission
      setTitle('');
      setIngredients('');
      setSteps('');

      // Refresh recipe list
      fetchRecipes();
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Make sure backend is running!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <textarea
        placeholder="Steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;

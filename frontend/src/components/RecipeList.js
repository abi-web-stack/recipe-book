import { useEffect, useState } from "react";

// Use backend URL from environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

function RecipeList({ fetchTrigger }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/recipes`);
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, [fetchTrigger]);

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>{recipe.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
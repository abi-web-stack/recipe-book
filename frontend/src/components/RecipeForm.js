import { useState } from "react";

// Use backend URL from environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

function RecipeForm({ fetchRecipes }) {
  const [recipeName, setRecipeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeName.trim()) return;

    try {
      await fetch(`${BASE_URL}/api/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: recipeName }),
      });
      setRecipeName(""); // clear input
      fetchRecipes(); // refresh the list
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="Enter recipe name"
        required
        style={{ padding: "8px", marginRight: "10px", width: "200px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Add Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
import { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshRecipes = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1>🍓 Recipe Book</h1>

      <RecipeForm fetchRecipes={refreshRecipes} />
      <RecipeList fetchTrigger={refresh} />
    </div>
  );
}

export default App;
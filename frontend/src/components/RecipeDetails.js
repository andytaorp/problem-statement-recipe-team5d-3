import { useRecipeContext } from '../hooks/useRecipeContext'

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipeContext()

  const handleClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, 
      {
        method: 'DELETE'
      }
    )
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: json })
    }
  }

  return (
    <div className="recipe-details">
      <h4>{recipe.name}</h4>

      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <p><strong>Cooking Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Preparation Time:</strong> {recipe.preptime} minutes</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default RecipeDetails;

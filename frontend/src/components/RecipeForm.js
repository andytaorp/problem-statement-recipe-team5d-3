import { useState } from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext'

const RecipeForm = () => {
  const { dispatch } = useRecipesContext()

  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [preptime, setPreptime] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const recipe = {name, ingredients, instructions, preptime, difficulty}
    
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/recipes`, {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setName('')
      setIngredients('')
      setInstructions('')
      setPreptime('')
      setDifficulty('')
      dispatch({type: 'CREATE_RECIPE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Recipe</h3>

      <label>Recipe Title:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />
      
      <label>Ingredients:</label>
      <input 
        type="text" 
        onChange={(e) => setIngredients(e.target.value)} 
        value={ingredients}
        className={emptyFields.includes('ingredients') ? 'error' : ''}
      />

      <label>Instructions:</label>
      <input 
        type="text" 
        onChange={(e) => setInstructions(e.target.value)} 
        value={instructions}
        className={emptyFields.includes('instructions') ? 'error' : ''}
      />

      <label>Preptime:</label>
      <input 
        type="number" 
        onChange={(e) => setPreptime(e.target.value)} 
        value={preptime}
        className={emptyFields.includes('preptime') ? 'error' : ''}
      />

      <label>Difficulty:</label>
      <input 
        type="text" 
        onChange={(e) => setDifficulty(e.target.value)} 
        value={difficulty}
        className={emptyFields.includes('difficulty') ? 'error' : ''}
      />

      <button>Add Recipe</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RecipeForm;

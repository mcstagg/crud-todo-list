import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = e => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput(['']);
  }

  const removeTodo = ({ e, currentToDo}) => {
    const removeItem = todos.filter((todo) => todo !== currentToDo);
    setTodos(removeItem);
  }

  return (
    <div className="app">
      <h1>Welcome to My TODO List</h1>
      <form> 
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>Add TODO</button>
      </form>

      <h2>List of TODOs:</h2>
      {todos.map((todo, i) => (
        <li key={i}>
          {todo}
          <button onClick={(e) => removeTodo({ e: e, currentToDo: todo})}>Delete</button>
        </li>
      ))}  
    </div>
  )
}

export default App;

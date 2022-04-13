import { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = e => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput(['']);
  }

  const removeTodo = task => {
    const removeItem = todos.filter(todo => todo !== task);
    setTodos(removeItem);
  }

  return (
    <div className="app">
      <h1>Welcome to My TODO List</h1>
      <form> 
        <input value={input} onChange={e => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>Add TODO</button>
      </form>

      <h2>List of TODOs:</h2>
      {todos.map((task, i) => (
        <li key={i}>
          {task}
          <button onClick={() => removeTodo(task)}>Delete</button>
        </li>
      ))}  
    </div>
  )
}

export default App;

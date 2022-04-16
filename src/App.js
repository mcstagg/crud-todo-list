import { useEffect, useRef, useState } from 'react';
import './App.css';

// The CRUD Homework Assignment!

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

const App = () => {
  const create = useRef(null);
  // TODO: fix update button click input focus 
  const update = useRef(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);

  // Focus on the CREATE input field on mount
  useEffect(() => {
    create.current.focus();
  }, []);

  // CREATE - The ability to type into an input field and hit the enter key to add a TODO to a list of TODO's
  const addTodo = e => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput(['']);
  }

  // READ - See JSX return

  // UPDATE - The ability to update a todo from the todo list
  const updateTodo = i => {
    // render edit input field & button onclick of update
    setUpdateClicked(true);
    // but only for the specifically selected task
    setSelectedTask(i);
    // gather input in JSX
    // focus on the input field
    update.current.focus();
  }

  const confirmEdit = (task, i) => {
    // update the todo onclick or onsumbit
    const newTodos = [...todos];
    //newTodos.push(task);
    newTodos.splice(i, 1, updateInput);
    setTodos(newTodos);
    setUpdateClicked(false);
    setUpdateInput('');
  }

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = i => {
    const removeItem = todos.filter((todo, index) => index !== i);
    setTodos(removeItem);
  }

  return (
    <div className="app">
      <h1>CRUD TODO LIST</h1>
      <form> 
        <input ref={create} value={input} onChange={e => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>CREATE</button>
      </form>

      {/* READ */}
      <h2>READ TODOs:</h2>
      {todos.map((task, i) => (
        <li key={i}>
          {task}
          {updateClicked === true && selectedTask === i && (
            <>
              <input ref={update} value={updateInput} onChange={e => setUpdateInput(e.target.value)} type="text"/>
              <button onClick={() => confirmEdit(task, i)}>Confirm Edit</button> 
            </>
          )}
          <button onClick={() => updateTodo(i)}>UPDATE</button>
          <button onClick={() => removeTodo(i)}>DELETE</button>
        </li>
      ))}  
    </div>
  )
}

export default App;

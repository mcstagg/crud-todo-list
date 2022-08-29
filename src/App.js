import { useEffect, useRef, useState } from 'react';
import './App.css';
import Quote from './Quote';

// The CRUD Homework Assignment!

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

// TODO: The TODO app should be styled appropriately (you could use Glassmorphism!)

// TODO: Refactor the app and break it up into components

// TODO: CHALLENGE 1: Persist the TODO's locally so that when the user refreshes the page, the list of TODO's is preserved!

// TODO: CHALLENGE 2: Add animations to the TODO list using this library!

// TODO: The client requests that the code is submitted to Github for review, once you have done this, fill this form to send the assignment to the client!

// TODO: Add TypeScpit throughout application

// TODO: Set up a MERN stack and persist the TODO's remotely that when the user refreshes the page, the list of TODO's is preserved!

// Console warnings/errors

// TODO: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead.

const App = () => {

  // Variables
  const create = useRef(null);
  const update = useRef(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Focus on the CREATE input field on mount/inital render only
  useEffect(() => {
    create.current.focus();
  }, []);

  // CREATE - Adds a todo to the todos array if the string in not empty. The todo is 
  // automatically capitalized and the input field is reset and refocused.
  const addTodo = e => {
    e.preventDefault();
    if (input != '') {
      setTodos([...todos, input.charAt(0).toLocaleUpperCase() + input.slice(1)]);
    }   
    setInput(['']);
    create.current.focus();
  }

  // READ - See JSX return

  // UPDATE - Updates a todo from the todo list in edit mode
  // Async funtion awaits update of state variables for input focus onClick
  const updateTodo = async (task, i) => {
    await setUpdateClicked(true);
    await setSelectedTask(i);
    await setUpdateInput(task);
    update.current.focus();
  }

  // CONFIRM EDIT - Confirms the edit and ends the editing process
  const confirmEdit = (task, i) => {
    // add edited todo back to the dom
    // update the todo onclick or onsumbit
    const newTodos = [...todos];
    //newTodos.push(task);
    newTodos.splice(i, 1, updateInput.charAt(0).toLocaleUpperCase() + updateInput.slice(1));
    setTodos(newTodos);
    setUpdateClicked(false);
    setUpdateInput('');
    setSelectedTask(undefined);
  }

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = i => {
    setCancelClicked(false);
    setUpdateClicked(false);
    setSelectedTask(i);
  }

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = i => {
    const removeItem = todos.filter((todo, index) => index !== i);
    setTodos(removeItem);
  }

  // MARK COMPLETED - Changes the styling of a specific todo item if it is clicked to 
  // signify that the task has been completed and can be crossed off the list or 
  // conversly can be uncrossed off the list if there is still more to be done
  const markCompleted = (i) => {
    if (completedTasks.includes(i)) {
      const removeTask = completedTasks.filter((index) => index !== i);
      setCompletedTasks(removeTask);
    } else {
      setCompletedTasks([...completedTasks, i])
    }
  };

  return (
    // CREATE
    <div className="app">
      <Quote />
      <h1><u>CRUD To Do:</u></h1>
      <form> 
        <input ref={create} value={input} onChange={e => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>CREATE</button>
      </form>

      {/* READ */}
      <h2><u>READ To Dos:</u></h2>
      <div id="main-container">
        <div id="todo-container">
          {/* TODO: Refactor to use ID as the key instead of the Index */}
          {todos.map((task, i) => (

            <li key={i} className='task-container'>
              
              {/* Show task only if its respective update button has NOT been clicked */}
              {selectedTask !== i && (
                <div className='task'>
                  &bull;&nbsp;
                  <p 
                    className={completedTasks.includes(i) ? "checked" : "unchecked"}
                    onClick={() => {markCompleted(i)}}
                  >
                    {task}
                  </p>
                </div>
              )}

              {/* Show update input field ONLY if update button is clicked and ONLY for the currently selected task */}
              {updateClicked === true && selectedTask === i && (
                <>
                  <p>&nbsp;&bull;&nbsp;</p>
                  <input
                    // Enter button submit functionality for update input field
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        ev.preventDefault();
                        confirmEdit(task, i);
                      }
                    }}
                    // placeholder={task}
                    ref={update} 
                    value={updateInput} 
                    onChange={e => setUpdateInput(e.target.value)} 
                    type="text"
                  />
                  <button onClick={() => confirmEdit(task, i)}>EDIT</button> 
                  <button onClick={() => cancelEdit(task, i)}>CANCEL</button>
                </>
              )}

              {/* Show update and delete buttons only if NOT in edit mode */}
              {cancelClicked !== true && selectedTask !== i && (
                <>
                  <button onClick={() => updateTodo(task, i)}>UPDATE</button>
                  <button onClick={() => removeTodo(i)}>DELETE</button>
                </>
              )}
            </li>
          ))}
        </div>
      </div>  
    </div>
  )
}

export default App;

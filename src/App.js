import { useEffect, useRef, useState } from 'react';
import './App.css';
import Quote from './Quote';
import Create from './Create';
import Read from './Read';

// The CRUD Homework Assignment!

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

// TODO: The TODO app should be styled appropriately (you could use Glassmorphism!)

// TODO: Refactor the app and break it up into components

// TODO: Refactor and break css up into component specific modules

// TODO: CHALLENGE 1: Persist the TODO's locally so that when the user refreshes the page, the list of TODO's is preserved!

// TODO: CHALLENGE 2: Add animations to the TODO list using this library!

// TODO: The client requests that the code is submitted to Github for review, once you have done this, fill this form to send the assignment to the client!

// TODO: Add TypeScpit throughout application

// TODO: Set up a MERN stack and persist the TODO's remotely that when the user refreshes the page, the list of TODO's is preserved!

// Console warnings/errors

// TODO: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

const App = () => {

  // Variables
  // const create = useRef(null);
  const update = useRef(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [completedTasks, setCompletedTasks] = useState([]);

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
    <div className="app">
      <Quote />
      <Create input={input} 
              setInput={setInput}
              todos={todos}
              setTodos={setTodos}
      />
      <Read todos={todos}
            selectedTask={selectedTask}
            completedTasks={completedTasks}
            markCompleted={markCompleted}
            updateClicked={updateClicked}
            confirmEdit={confirmEdit}
            update={update}
            updateInput={updateInput}
            setUpdateInput={setUpdateInput}
            cancelEdit={cancelEdit}
            cancelClicked={cancelClicked}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
      /> 
    </div>
  )
}

export default App;

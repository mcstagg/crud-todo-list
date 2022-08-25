import { useEffect, useRef, useState } from 'react';
import './App.css';

// The CRUD Homework Assignment!

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

// TODO: The TODO app should be styled appropriately (you could use Glassmorphism!)

// TODO: At the top of the page, the client wants an inspirational quote which is different each time the user refreshes the page. The quote should be fetched from the following API: https://type.fit/api/quotes

// TODO: Refactor the app and break it up into components

// TODO: CHALLENGE 1: Persist the TODO's so that when the user refreshes the page, the list of TODO's is preserved!

// TODO: CHALLENGE 2: Add animations to the TODO list using this library!

// TODO: The client requests that the code is submitted to Github for review, once you have done this, fill this form to send the assignment to the client!

const App = () => {

  // Variables
  const create = useRef(null);
  const update = useRef(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [style, setStyle] = useState("cont");
  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [selectedStyle, setSelectedStyle] = useState(undefined);
  const [isActive, setIsActive] = useState(false);

  // Focus on the CREATE input field on mount/inital render only
  useEffect(() => {
    console.log(create);
    console.log(create.current);
    create.current.focus();
  }, []);

  // // Listen for update button click event and focus the curosr in the update input field
  // useEffect(() => {
  //   const pointer = update.current;
  //   return () => {
  //     pointer.focus();
  //   }
  // }, [update])

  // CREATE - The ability to type into an input field and hit the enter key to add a TODO to a list of TODO's
  // TODO: Auto Capitalize the first letter of each todo
  const addTodo = e => {
    e.preventDefault();
    setTodos([...todos, input]);
    console.log(todos);
    setInput(['']);
  }

  // READ - See JSX return

  // UPDATE - The ability to update a todo from the todo list
  const updateTodo = i => {
    // remove current todo item from dom
    // render edit input field & button onclick of update
    setUpdateClicked(true);
    // but only for the specifically selected task
    setSelectedTask(i);
    // gather input in JSX
    console.log(update);
    console.log(update.current);
    // TODO: Have update button foucs to input field on inital click
    update.current.focus();
  }

  // CONFIRM EDIT - Confirms the edit and ends the editing process
  const confirmEdit = (task, i) => {
    // add edited todo back to the dom
    // update the todo onclick or onsumbit
    const newTodos = [...todos];
    //newTodos.push(task);
    newTodos.splice(i, 1, updateInput);
    setTodos(newTodos);
    setUpdateClicked(false);
    setUpdateInput('');
    setSelectedTask(undefined);
  }

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = i => {
    const removeItem = todos.filter((todo, index) => index !== i);
    setTodos(removeItem);
  }

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = i => {
    setCancelClicked(false);
    setUpdateClicked(false);
    setSelectedTask(i);
  }

  // Change styling onclick
  const changeStyle = (i) => {

    console.log("you just clicked");
    setIsActive(true);

    if (style === "cont") {
      setStyle("cont2");
    } else {
      setStyle("cont")
    }
  };

  return (
    // CREATE
    <div className="app">
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
              {/* TODO: Replace task with input field with ph text on update click */}
              {/* Show task only if its respective update button has NOT been clicked */}
              {selectedTask !== i && (
                <div className='task'>
                  &bull;&nbsp;
                  {/* TODO: Add click functionality to indicate completion of a TODO, the text should turn green and have a strikethrough once completed */}
                  <p className={style} 
                     onClick={() => changeStyle(i)}
                  >
                    {task}
                  </p>
                </div>
              )}

              {/* Show update input field ONLY if update button is clicked and ONLY for the currently selected task */}
              {updateClicked === true && selectedTask === i && (
                <>
                  <input
                    // Enter button submit functionality for update input field
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                      ev.preventDefault();
                      console.log(ev.target.value);
                      confirmEdit(task, i)
                      }
                    }}
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
                  <button onClick={() => updateTodo(i)}>UPDATE</button>
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

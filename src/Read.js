import React, { useRef, useState } from 'react';

function Read({ todos, setTodos }) {

  // VARIABLES
  const update = useRef(null);

  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [completedTasks, setCompletedTasks] = useState([]);

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
    <div>
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

export default Read;
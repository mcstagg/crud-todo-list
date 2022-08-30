import React, { useRef } from 'react';

function Read(
    { todos, 
      selectedTask, 
      completedTasks, 
      markCompleted, 
      updateClicked,
      confirmEdit, 
      updateInput,
      setUpdateInput,
      cancelEdit,
      cancelClicked,
      removeTodo,
      setSelectedTask,
      setUpdateClicked
    }){

  // VARIABLES
  const update = useRef(null);

  // UPDATE - Updates a todo from the todo list in edit mode
  // Async funtion awaits update of state variables for input focus onClick
  const updateTodo = async (task, i) => {
    await setUpdateClicked(true);
    await setSelectedTask(i);
    await setUpdateInput(task);
    update.current.focus();
  }

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
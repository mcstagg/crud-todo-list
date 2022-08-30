import React, { useRef, useState } from 'react';
import Delete from './Delete';
import ShowTodo from './ShowTodo';
import Update from './Update';


function Read({ todos, setTodos }) {

  // VARIABLES
  const update = useRef(null);
  const [selectedTask, setSelectedTask] = useState(undefined);

  const [updateInput, setUpdateInput] = useState('');
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);

  // UPDATE - Updates a todo from the todo list in edit mode
  // Async funtion awaits update of state variables for input focus onClick
  const updateTodo = async (task, i) => {
    await setUpdateClicked(true);
    await setSelectedTask(i);
    await setUpdateInput(task);
    update.current.focus();
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
                <ShowTodo task={task} i={i} />
              )}

              {/* Show update input field ONLY if update button is clicked and ONLY for the currently selected task */}
              {updateClicked === true && selectedTask === i && (
                <Update 
                  update={update}
                  updateInput={updateInput}
                  setUpdateInput={setUpdateInput}
                  cancelEdit={cancelEdit}
                  task={task}
                  i={i}
                  todos={todos}
                  setTodos={setTodos}
                  setSelectedTask={setSelectedTask}
                  setUpdateClicked={setUpdateClicked}
                />
              )}

              {/* Show update and delete buttons only if NOT in edit mode */}
              {cancelClicked !== true && selectedTask !== i && (
                <Delete 
                  task={task} 
                  i={i} 
                  updateTodo={updateTodo} 
                  removeTodo={removeTodo} />
              )}
            </li>
          ))}
        </div>
      </div>  
    </div>
  )
}

export default Read;
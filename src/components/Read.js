import { useRef, useState } from 'react';
import ShowTodo from './ShowTodo';
import EditMode from './EditMode';
import UpdateAndDelete from './UpdateAndDelete';

const Read = ({ todos, setTodos }) => {

  // BUG FIXES
  // TODO: When you delete a todo item from above the input field while in
  // edit mode... the todo items slide up and you begin editing the wrong item

  // VARIABLES
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const update = useRef(null);

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = i => {
    setCancelClicked(false);
    setUpdateClicked(false);
    setSelectedTask(i);
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
                <EditMode
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
                <UpdateAndDelete 
                  task={task} 
                  i={i} 
                  todos={todos}
                  setTodos={setTodos}
                  setUpdateClicked={setUpdateClicked}
                  setSelectedTask={setSelectedTask}
                  setUpdateInput={setUpdateInput}
                />
              )}
            </li>
          ))}
        </div>
      </div>  
    </div>
  )
}

export default Read;
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
                  i={i}
                  task={task}
                  todos={todos}
                  setTodos={setTodos}
                  update={update}
                  updateInput={updateInput}
                  setUpdateInput={setUpdateInput}          
                  setSelectedTask={setSelectedTask}
                  setUpdateClicked={setUpdateClicked}
                  setCancelClicked={setCancelClicked}
                />
              )}

              {/* Show update and delete buttons only if NOT in edit mode */}
              {cancelClicked !== true && selectedTask !== i && (
                <UpdateAndDelete 
                  i={i} 
                  task={task} 
                  todos={todos}
                  setTodos={setTodos}
                  update={update}
                  setSelectedTask={setSelectedTask}
                  setUpdateClicked={setUpdateClicked}
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
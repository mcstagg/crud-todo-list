import { useRef, useState } from 'react';
import ShowTodo from './ShowTodo';
import EditMode from './EditMode';
import UpdateAndDelete from './UpdateAndDelete';
import '../styles/Read.css';

type ReadProps = {
  todos: any;
  setTodos: React.Dispatch<React.SetStateAction<any>>;
};

const Read = ({ todos, setTodos } : ReadProps ) => {

  // VARIABLES
  const [selectedTask, setSelectedTask] = useState<number>(-1);
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const [cancelClicked, setCancelClicked] = useState<boolean>(false);
  const [updateInput, setUpdateInput] = useState<string>('');
  const update = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2><u>READ To Dos:</u></h2>
      <div className="main-container">
        <div className="todo-container">
          {todos.map((task: any, i: any) => (

            <li key={task.id} className='task-container'>
              
              {/* Show task only if its respective update button has NOT been clicked */}
              {selectedTask !== i && (
                <ShowTodo task={task.todo} i={i} todos={todos} />
              )}

              {/* Show update input field ONLY if update button is clicked and ONLY for the currently selected task */}
              {updateClicked === true && selectedTask === i && (
                <EditMode
                  i={i}
                  task={task.todo}
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
                  task={task.todo} 
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
};

export default Read;
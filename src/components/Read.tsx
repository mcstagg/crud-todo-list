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
  const [cancelClicked, setCancelClicked] = useState<boolean>(true);
  const [updateInput, setUpdateInput] = useState<any>('');
  const update = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2><u>READ To Dos:</u></h2>
      <div className="main-container">
        <div className="todo-container">
          {todos.map((task: any, i: any) => (

            <li key={task.id} className='task-container'>
              
              {/* Show task, update, and delete only if NOT in edit mode */}
              {cancelClicked === true && selectedTask !== i && (
                <>
                  <ShowTodo task={task} i={i} todos={todos} setTodos={setTodos} />
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
                </>
              )}

              {/* Show edit mode on update click ONLY for the currently selected task */}
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
            </li>
          ))}
        </div>
      </div>  
    </div>
  )
};

export default Read;
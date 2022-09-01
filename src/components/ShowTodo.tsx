import { useState } from 'react';
import '../styles/ShowTodo.css';

type TodoProps = {
  task: string;
  i: number;
};

const ShowTodo = ({ task, i }: TodoProps ) => {

  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // MARK COMPLETED - Changes the styling of a specific todo item if it is clicked to 
  // signify that the task has been completed and can be crossed off the list or 
  // conversly can be uncrossed off the list if the task had not been completed
  const markCompleted = (i: number) => {
    if (completedTasks.includes(i)) {
      const removeTask = completedTasks.filter((index) => index !== i);
      setCompletedTasks(removeTask);
    } else {
      setCompletedTasks([...completedTasks, i])
    }
  };

  return (
    <div className='task'>
      &bull;&nbsp;
      <p 
        className={completedTasks.includes(i) ? "completed" : "not-completed"}
        onClick={() => {markCompleted(i)}}
      >
        {task}
      </p>
    </div>
  )
};

export default ShowTodo;

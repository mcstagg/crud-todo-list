import { useState } from 'react';

type TodoProps = {
  task: string;
  i: number;
}

const ShowTodo = ({ task, i }: TodoProps ) => {

  // VARIABLES
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // MARK COMPLETED - Changes the styling of a specific todo item if it is clicked to 
  // signify that the task has been completed and can be crossed off the list or 
  // conversly can be uncrossed off the list if there is still more to be done
  const markCompleted = (i: number) => {
    // console.log(item);
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
        className={completedTasks.includes(i) ? "checked" : "unchecked"}
        onClick={() => {markCompleted(i)}}
      >
        {task}
      </p>
    </div>
  )
}

export default ShowTodo;

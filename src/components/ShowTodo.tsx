import { useEffect, useState } from 'react';
import '../styles/ShowTodo.css';

type TodoProps = {
  task: string;
  i: any;
  todos: string[];
};

const ShowTodo = ({ task, i, todos }: TodoProps ) => {

  const [completedTasks, setCompletedTasks] = useState<any>([]);

  // // Get items from local storage
  // useEffect(() => {
  //   const data = window.localStorage.getItem('Marked_Todos');
  //   if (data != null) {
  //     setCompletedTasks(JSON.parse(data));
  //   };
  // }, []);

  // Add items to local storage
  useEffect(() => {
    window.localStorage.setItem('Marked_Todos', JSON.stringify(completedTasks));
  }, [completedTasks]);

  // MARK COMPLETED - Changes the styling of a specific todo item if it is clicked to 
  // signify that the task has been completed and can be crossed off the list or 
  // conversly can be uncrossed off the list if the task had not been completed
  const markCompleted = (i: any) => {
    console.log(i);
    if (completedTasks.includes(i)) {
      const removeTask = completedTasks.filter((index: any) => index !== i);
      setCompletedTasks(removeTask);
    } else {
      setCompletedTasks([...completedTasks, i])
      console.log(completedTasks);
    }
    // console.log(completedTasks);
    // console.log(todos);
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

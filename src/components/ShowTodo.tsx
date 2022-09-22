import { useEffect, useState } from 'react';
import '../styles/ShowTodo.css';

type TodoProps = {
  task: any;
  i: any;
  todos: any;
  setTodos: any;
};

const ShowTodo = ({ task, i, todos, setTodos }: TodoProps ) => {

  // MARK COMPLETED - Changes the styling of a specific todo item if it is clicked to 
  // signify that the task has been completed and can be crossed off the list or 
  // conversly can be uncrossed off the list if the task had not been completed
  const markCompleted = (i: any) => {
    const newTodos: any = [...todos];

    if (task.isChecked === false) {
      // TODO: Better way to do this? Retain original uuid from create?
      newTodos.splice(i, 1, {todo: task.todo, id: task.id, isChecked: true});
      setTodos(newTodos);
    } else if (task.isChecked === true) {
      // TODO: Better way to do this? Retain original uuid from create?
      newTodos.splice(i, 1, {todo: task.todo, id: task.id, isChecked: false});
      setTodos(newTodos);
    }
  };

  return (
    <div className='task'>
      &bull;&nbsp;
      <p 
        className={task.isChecked ? "completed" : "not-completed"}
        onClick={()=> markCompleted(i)}
      >
        {task.todo}
      </p>
    </div>
  )
};

export default ShowTodo;

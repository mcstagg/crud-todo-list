import React from 'react';

function Delete({ task, i , updateTodo, removeTodo }) {

  return (
    <>
      <button onClick={() => updateTodo(task, i)}>UPDATE</button>
      <button onClick={() => removeTodo(i)}>DELETE</button>
    </>
  )
}

export default Delete;
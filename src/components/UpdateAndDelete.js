// UPDATE AND DELETE FUNCTIONALITY 

const UpdateAndDelete = ({ 
  i, 
  task, 
  todos,
  setTodos,
  update,
  setSelectedTask, 
  setUpdateClicked, 
  setUpdateInput }) => {

  // UPDATE - Updates a todo from the todo list in edit mode
  // Async funtion awaits update of state variables for input focus onClick
  const updateTodo = async (task, i) => {
    await setUpdateClicked(true);
    await setSelectedTask(i);
    await setUpdateInput(task);
    update.current.focus();
  }

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = i => {
    const removeItem = todos.filter((todo, index) => index !== i);
    setTodos(removeItem);
  }

  return (
    <>
      <button onClick={() => updateTodo(task, i)}>UPDATE</button>
      <button onClick={() => removeTodo(i)}>DELETE</button>
    </>
  )
}

export default UpdateAndDelete;
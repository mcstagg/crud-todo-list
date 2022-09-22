// UPDATE AND DELETE FUNCTIONALITY 

type UpdateAndDeleteProps = {
  i: number;
  task: any
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  update: React.RefObject<HTMLInputElement>;
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>;
  setUpdateClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateInput: React.Dispatch<React.SetStateAction<string>>;
};

const UpdateAndDelete = ({ 
  i, 
  task, 
  todos,
  setTodos,
  update,
  setSelectedTask, 
  setUpdateClicked, 
  setUpdateInput }: UpdateAndDeleteProps ) => {

  // UPDATE - Updates a todo from the todo list in edit mode
  // Async funtion awaits update of state variables for input focus onClick
  const updateTodo = async (task: any, i: number) => {
    // Throw true/1 flag for button click to enter edit mode
    await setUpdateClicked(true);
    // Mark and track which items update button was clicked
    await setSelectedTask(i);
    // Place the task itself into a state variable
    await setUpdateInput(task);
    // Focus priority to update input field
    update.current?.focus();
  };

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = (i: number) => {
    // Implicitly return all todos that do not equal the index of the delete click
    const removeItem = todos.filter((todo, index) => index !== i);
    // Reset the todos[] with the new list
    setTodos(removeItem);
  };

  return (
    <div>
      <button onClick={() => updateTodo(task.todo, i)}>UPDATE</button>
      <button onClick={() => removeTodo(i)}>DELETE</button>
    </div>
  )
};

export default UpdateAndDelete;
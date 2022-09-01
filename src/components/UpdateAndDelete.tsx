// UPDATE AND DELETE FUNCTIONALITY 

type UpdateAndDeleteProps = {
  i: number;
  task: string;
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
  const updateTodo = async (task: string, i: number) => {
    await setUpdateClicked(true);
    await setSelectedTask(i);
    await setUpdateInput(task);
    update.current?.focus();
  };

  // DELETE - The ability to delete a todo from the todo list
  const removeTodo = (i: number) => {
    const removeItem = todos.filter((todo, index) => index !== i);
    setTodos(removeItem);
  };

  return (
    <>
      <button onClick={() => updateTodo(task, i)}>UPDATE</button>
      <button onClick={() => removeTodo(i)}>DELETE</button>
    </>
  )
};

export default UpdateAndDelete;
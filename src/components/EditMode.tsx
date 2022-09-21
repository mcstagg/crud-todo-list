import { v4 as uuidv4 } from 'uuid';

type EditModeProps = {
  i: number;
  task: string;
  todos: any;
  setTodos: React.Dispatch<React.SetStateAction<any>>;
  update: React.RefObject<HTMLInputElement>;
  updateInput: string;
  setUpdateInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>;
  setUpdateClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCancelClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMode = ({  
  i,
  task,
  todos,
  setTodos,
  update, 
  updateInput, 
  setUpdateInput, 
  setSelectedTask,
  setUpdateClicked,
  setCancelClicked } : EditModeProps ) => {

  // CONFIRM EDIT - Confirms the edit and ends the editing process
  const confirmEdit = async (task: string, i: number) => {
    const newTodos: any = [...todos];
    newTodos.splice(i, 1, {todo: updateInput.charAt(0).toLocaleUpperCase() + updateInput.slice(1), id: uuidv4()});
    setTodos(newTodos);
    setUpdateClicked(false);
    setUpdateInput('');
    setSelectedTask(-1);
  };

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = (task: string, i: number) => {
    setCancelClicked(false);
    setUpdateClicked(false);
    setSelectedTask(i);
  };

  return (
    <>
      <p>&nbsp;&bull;&nbsp;</p>
      <input
        // Enter button submit functionality for update input field
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            confirmEdit(task, i);
          }
        }}
        ref={update} 
        value={updateInput} 
        onChange={e => setUpdateInput(e.target.value)} 
        type="text"
      />
      <button onClick={() => confirmEdit(task, i)}>EDIT</button> 
      <button onClick={() => cancelEdit(task, i)}>CANCEL</button>
    </>
  )
};

export default EditMode;
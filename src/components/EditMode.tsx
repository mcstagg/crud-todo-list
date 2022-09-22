// Edit Mode

type EditModeProps = {
  i: number;
  task: any;
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
  const confirmEdit = async (i: number) => {
    const newTodos: any = [...todos];
    newTodos.splice(
      i, 
      1, 
      {
        todo: updateInput.charAt(0).toLocaleUpperCase() + updateInput.slice(1), 
        id: task.id,
        isChecked: task.isChecked
      }
    );
    setTodos(newTodos);
    // Turn off update click button flag to return to default list view
    setUpdateClicked(false);
    setUpdateInput('');
    // Set the specific task index tracker back to default standby mode
    setSelectedTask(-1);
  };

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = (i: number) => {
    // Set cancel button clicked flag to true
    setCancelClicked(true);
    // Change update click button flag to leave edit mode
    setUpdateClicked(false);
    // Rest specfic task marker back to default standby mode
    setSelectedTask(-1);
  };

  return (
    <div>
      &nbsp;&bull;&nbsp;
      <input
        // Enter button submit functionality for update input field
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            confirmEdit(i);
          }
        }}
        ref={update} 
        value={updateInput} 
        onChange={e => setUpdateInput(e.target.value)} 
        type="text"
      />
      <button onClick={() => confirmEdit(i)}>EDIT</button> 
      <button onClick={() => cancelEdit(i)}>CANCEL</button>
    </div>
  )
};

export default EditMode;
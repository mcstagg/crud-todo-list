// EDIT MODE FUNCTIONALITY

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
  setCancelClicked }) => {
  
  // CONFIRM EDIT - Confirms the edit and ends the editing process
  const confirmEdit = (task, i) => {
    // add edited todo back to the dom
    // update the todo onclick or onsumbit
    const newTodos = [...todos];
    //newTodos.push(task);
    newTodos.splice(i, 1, updateInput.charAt(0).toLocaleUpperCase() + updateInput.slice(1));
    setTodos(newTodos);
    setUpdateClicked(false);
    setUpdateInput('');
    setSelectedTask(undefined);
  }

  // CANCEL EDIT - Cancels the editing process
  const cancelEdit = i => {
    setCancelClicked(false);
    setUpdateClicked(false);
    setSelectedTask(i);
  }

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
}

export default EditMode;
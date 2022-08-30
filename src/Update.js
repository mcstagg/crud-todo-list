import React from 'react';

function Update({ confirmEdit, update, updateInput, setUpdateInput, cancelEdit, task, i }) {
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

export default Update;
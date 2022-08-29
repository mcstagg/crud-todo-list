import React from 'react';

function Create({create, input, setInput, addTodo}) {
  return (
    <div>
      <h1><u>CRUD To Do:</u></h1>
      <form> 
        <input ref={create} value={input} onChange={e => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>CREATE</button>
      </form>
    </div>
  )
}

export default Create;
import React, { useEffect, useState, useRef } from 'react';

const Create = ({ todos, setTodos }) => {

  // Variables
  const create = useRef(null);
  const [input, setInput] = useState('');
  
  // Focus on the CREATE input field on mount/inital render only
  useEffect(() => {
    create.current.focus();
    console.log(React.version);
  }, []);

  /* CREATE - Adds a todo to the todos array if the string in not empty. 
  The todo is automatically capitalized and the input field is reset and refocused. */
  const addTodo = e => {
    e.preventDefault();
    if (input != '') {
      setTodos([...todos, input.charAt(0).toLocaleUpperCase() + input.slice(1)]);
    }   
    setInput(['']);
    create.current.focus();
  }

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
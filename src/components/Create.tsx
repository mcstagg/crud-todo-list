import React, { useEffect, useState, useRef, FC } from 'react';
import '../styles/Create.css';
import { v4 as uuidv4 } from 'uuid';

type CreateProps = {
  todos: any;
  setTodos: React.Dispatch<React.SetStateAction<any>>;
  // marked: string;
  // count: 0;
};

type Completed = {
  done: string;
  notDone: string
}

const Create: FC<CreateProps> = ({ todos, setTodos }) => {

  // Variables
  const create = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const complete = useState<Completed>({done: "", notDone: ""});
  
  // Focus on the CREATE input field on mount/inital render only
  useEffect(() => {
    create.current?.focus();
  }, []);

  /* CREATE - Adds a todo to the todos array if the string in not empty. 
  The todo is automatically capitalized and the input field is reset and refocused. */
  const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (input != '') {
      setTodos([...todos, {todo: input.charAt(0).toLocaleUpperCase() + input.slice(1), id: uuidv4()}]);
      // [...todos, input.charAt(0).toLocaleUpperCase() + input.slice(1)]
    }   
    setInput('');
    create.current?.focus();
  };

  return (
    <div>
      <h1><u>CRUD To Do:</u></h1>
      <form> 
        <input ref={create} value={input} onChange={e => setInput(e.target.value)} type="text" />
        <button type="submit" onClick={addTodo}>CREATE</button>
      </form>
    </div>
  )
};

export default Create;
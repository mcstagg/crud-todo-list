import { useRef, useState } from 'react';
import './App.css';
import Quote from './components/Quote';
import Create from './components/Create';
import Read from './components/Read';

// The CRUD Homework Assignment!

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

// TODO: The TODO app should be styled appropriately (you could use Glassmorphism!)

// TODO: Refactor and break css up into component specific modules

// TODO: CHALLENGE 1: Persist the TODO's locally so that when the user refreshes the page, the list of TODO's is preserved!

// TODO: CHALLENGE 2: Add animations to the TODO list using this library!

// TODO: The client requests that the code is submitted to Github for review, once you have done this, fill this form to send the assignment to the client!

// TODO: Add TypeScpit throughout application

// TODO: Set up a MERN stack and persist the TODO's remotely that when the user refreshes the page, the list of TODO's is preserved!

// Console warnings/errors

// TODO: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

// export type DataType = {
//   item: string;
// }

const App = () => {

  // VARIABLES
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className="app">
      <Quote />
      <Create todos={todos} setTodos={setTodos} />
      <Read todos={todos} setTodos={setTodos} /> 
    </div>
  )
}

export default App;
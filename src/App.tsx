import { useEffect, useState } from 'react';
import Quote from './components/Quote';
import Create from './components/Create';
import Read from './components/Read';
import './App.css';

// Your client requires a TODO list application, they have submitted a list of requirements. The application must have the following features:

// TODO: The TODO app should be styled appropriately (you could use Glassmorphism!)

// TODO: Add animations to the TODO list using this library!

// TODO: Persist the TODO's locally so that when the user refreshes the page, the list of TODO's is preserved!

// TODO: Set up a MERN stack and persist the TODO's remotely that when the user refreshes the page, the list of TODO's is preserved!

// TODO: The client requests that the code is submitted to Github for review, once you have done this, fill this form to send the assignment to the client!

// Console warnings/errors

// TODO: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

const App = () => {

  // VARIABLES
  const [todos, setTodos] = useState<any>([]);

  // Get items from local storage
  useEffect(() => {
    const data = window.localStorage.getItem('The_Todos');
    if (data != null) {
      setTodos(JSON.parse(data));
    };
  }, []);

  // Add items to local storage
  useEffect(() => {
    window.localStorage.setItem('The_Todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <Quote />
      <Create todos={todos} setTodos={setTodos} />
      <Read todos={todos} setTodos={setTodos} /> 
    </div>
  )
};

export default App;
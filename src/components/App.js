import React, {useState} from 'react';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const App = () => {
  const [viewTask, setViewTasks]=useState(true);

  return (
      <>
          <button onClick={()=>setViewTasks((prevViewTasks)=>!prevViewTasks)}>
              {viewTask ? 'Ocultar': 'Ver'} Información
          </button>
          {
              viewTask && <TodoList/>
          }

      </>
  );
};

export default App;


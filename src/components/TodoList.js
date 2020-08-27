
import React, { useEffect, useState } from 'react';
import '../styles/todo-list.css';
import Spinner from "./Spinner";

const TodoList = () => {

  const [ todos, setTodos ] = useState( [] );
  const [ completed, setCompleted ] = useState( [] );
  const [ userInf, setUserInf ] = useState( null);
  const [ taskInf, setTaskInf ] = useState( []);

  const [number,setNumber]=useState(1);

  useEffect( () => {
    console.log( 'efecto', todos.length );
    if( todos.length > 0 ) {
      document.title = `${ todos.length } tareas pendientes`;
    } else {
      document.title = 'No tienes tareas pendientes';
    }
  }, [ todos ] );

  useEffect(  () => {

    const getData = async ()=>{
      const data=await fetch('https://jsonplaceholder.typicode.com/users/' + number);
      const dataJson = await data.json();
      setUserInf(dataJson);

      const dataNew = await fetch( 'https://jsonplaceholder.typicode.com/users/' + number + '/todos' );
      const dataJsonNew = await dataNew.json();
      console.log(`dataJsonNew`, JSON.stringify(dataJsonNew,null,4));
      setTaskInf( dataJsonNew );
    };
    getData();
  }, [number] );

  const prevUser = () => {
    setNumber(number - 1)
    console.log(number);
  };

  const nextUser = () => {
    setNumber(number + 1)
    console.log(number);
  }

  const handleAddTask = () => {
    const task = document.querySelector( '#task' ).value;
    setTodos( prevState => [ ...prevState, task ] );
    document.querySelector( '#task' ).value = '';
  };

  const handleDeleteTask = ( index ) => {
    setTaskInf( ( prevState ) => {
      return prevState.filter( ( _, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {

    const taskInfUpdated = [ ...taskInf ];
    taskInfUpdated[index].completed = true;
    setTaskInf( taskInfUpdated );

    setCompleted( taskInfUpdated);
  };


  return (

    <>

    <div>
      {
        number >1 &&
        <button id="prevUser" onClick={ prevUser }>Anterior usuario</button>
      }

      {
        number < 10 &&
        <button id="nextUser" onClick={ nextUser }>Siguiente Usuario</button>
      }

      <h1 align="center">Informacion del Usuario {number}</h1>
        {
          userInf ?
                <ul>
                  <li>Nombre: {userInf.name}</li>
                  <li>Usuario: {userInf.username}</li>
                  <li>Correo: {userInf.email}</li>
                  <li>Sitio Web: {userInf.website}</li>
                  <li>Teléfono: {userInf.phone}</li>
                </ul>
              : <Spinner />
        }
    </div>


      <div>
        <label htmlFor='task'>Tarea</label>
        <input type='text' id='task' />

        <button onClick={ handleAddTask }>Agregar tarea</button>
      </div>
      <h1>Lista de tareas ({ todos.length } en total)</h1>
      <ul>
        {
          todos.map( ( task, index ) => {
                  return <li key={ `task${index}` }>{ task} </li>
              })
        }
      </ul>

      <div>
        <h1>Lista de tareas pendientes ({taskInf.length} en total) </h1>
        {
          taskInf
              ?
        <table>
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Eliminar</th>
          </tr>
          </thead>
          <tbody>
          {
            taskInf.map( ( taskInf, index ) => (
                    <tr key={ index }>
                      <td>{ taskInf.title }</td>
                      <td>
                        {
                          taskInf.completed ?
                              <button id="completed" className="complete"> Completada</button>
                              : <button className="incomplete" onClick={()=>handleCompleteTask(index)}>Marcar como completada</button>
                              }
                      </td>
                      <td>
                        <button onClick={ () => handleDeleteTask(index) }>Eliminar</button>
                      </td>
                    </tr>
                )
            )
          }
          </tbody>
        </table>
        : <Spinner />
        }
      </div>
    </>
  );
};

export default TodoList;

import React from "react";
import { useEffect, useRef, useState } from "react";

//create your first component
function Todolist() {
  let nombreRef = useRef(null);
  const [task, setTask] = useState ([]);

  const [urlApi] = useState("http://assets.breatheco.de/apis/fake/todos/user/SussanHernandez")//declara api

  useEffect(() => {
    getTask(urlApi)
  }, [])
 
  const getTask = url => {
    fetch(url)
      .then(Response => Response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
  
  const getUser = url => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(Response => Response.json())
      .then(data => console.log(data.result))
      .catch(error => console.log(error));
  };
  
  const updateTask = (url, task) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

  }

  const addTask = (e) => {
    if (e.keyCode === 13 && nombreRef.value !== "") {
      setTask(task.concat(nombreRef.value));
      nombreRef.value = "";
    }
  };

  const deleteTask = (index) =>{
    task.splice(index,1);
    setTask([...task]);
  };

  const deleteAll= () => {

    fetch(urlApi, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()
    ).then(data => console.log(data)

    ).catch(error => console.log(error))

  }


  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title text-center">To do list <i className="fas fa-tasks"></i></h1> 
          <ul className="list-group list-group-flush">
            <div className="input-group mb-2 list-group list-group-flush">
              <input
                onKeyUp={addTask}
                ref={(r) => (nombreRef = r)}
                type="text"
                id="input"
                className="list-group-item"
                placeholder="What needs to be done?"
              />
            </div>

            {!!task.length > 0 &&
              task.map((valor, index) => {
                return (
                  <li class="list-group-item" key={index}>
                    {valor}{" "}
                    <i
                      className="fas fa-trash float-right"
                      id="eliminar"
                      onClick={() => deleteTask(index)}
                    ></i>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card-footer text-muted">
          Things to do {task.length}
        </div>
      </div>
    </div>
  );
}
export default Todolist;
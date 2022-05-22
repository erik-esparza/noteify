import React, { useState, useEffect } from 'react';
import './App.css';
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import Alert from "./components/Alert"
import Scroll from "./components/Scroll"
import Stars from "./components/Stars"


function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [star, setStar] = useState(false);

  const noFavs = todos.filter(todo => todo.isStarred === false);
  const noArch = noFavs.filter(todo => todo.isArchived === false);

  const filterHandler = () => {
    switch(status) {
    case ('done'):
      setFilterTodos(todos.filter(todo => todo.completed === true));
      break;
    case ('pending'):
      setFilterTodos(todos.filter(todo => todo.completed === false));
      break;
    case ('isArchived'):
      setFilterTodos(todos.filter(todo => todo.isArchived === true));
      break;
    default:
      setFilterTodos(noArch);
      break;
    }
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

    useEffect(() => {
    getLocalTodos();
    console.log('effect get was triggered')
    }, [])
  
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    console.log('effect filter save was triggered')
    }, [todos, status, inputText])

  return (
    <div className="App">
      <Alert show={show} setShow={setShow}/>
      <header>
        <h1 className="AppTitle">
          Noteify
        </h1>
      </header>

      <Form setInputText={setInputText} inputText={inputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/>
      <Stars star={star} setStar={setStar} todos={todos} setTodos={setTodos} setShow={setShow} />
      <TodoList filterTodos={filterTodos} todos={todos} setTodos={setTodos} setInputText={setInputText} inputText={inputText} show={show} setShow={setShow} setStar={setStar} star={star} />
      <Scroll />
    </div>
  );
}

export default App;

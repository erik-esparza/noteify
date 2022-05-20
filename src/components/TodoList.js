import React from 'react';
import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filterTodos, setShow}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                { 
                    filterTodos.map((todo) => (
                        <Todo
                        todos={todos}
                        text={todo.text}
                        key={todo.id}
                        setTodos={setTodos}
                        todo={todo}
                        setShow={setShow}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList;
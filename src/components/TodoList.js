import React from 'react';
import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filterTodos }) => {
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
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList;
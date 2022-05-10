import React from 'react';

const Form  = ( {setInputText, inputText, todos, setTodos, setStatus, setArchived} ) => {
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value)
    };

    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 1000, isTrashed: false, isArchived: false},
        ]);
        setInputText("")
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
    <form className="form-control">
        <input value={inputText} onChange={inputTextHandler} type="text" className="searchbar-control" placeholder="Add your note..." />
        <button onClick={submitTodoHandler} className="todo-btn" type="submit">
            &#43;
        </button>

        <div className="select">
            <select onChange={statusHandler} name="todos" className="todo-filter">
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="pending">Pending</option>
                <option value="isArchived"> Archived </option>
            </select>
        </div>
    </form>
    )
};

export default Form;
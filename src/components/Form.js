import React from 'react';

const Form  = ( {setInputText, inputText, todos, setTodos, setStatus, star, setStar} ) => {
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value)
    };

    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 1000, isTrashed: false, isArchived: false, isStarred: false},
        ]);
        setInputText("")
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
    <form className="form-control">
        <input value={inputText} onChange={inputTextHandler} minLength={"1"} type="text" className="searchbar-control" placeholder="Add your note..." required />
        <button onClick={submitTodoHandler} className="todo-btn" type="submit">
            &#43;
        </button>

        <div className="select">
            <select onChange={statusHandler} name="todos" className="todo-filter">
                <option className="option" value="all">All</option>
                <option className="option" value="done">Done</option>
                <option className="option" value="pending">Pending</option>
                <option className="option" value="isArchived"> Archived </option>
            </select>
        </div>
    </form>
    )
};

export default Form;
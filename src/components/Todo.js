import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";

const Todo = ({text, todo, todos, setTodos, setShow, star, setStar}) => {
    //Events
    const deleteHandler = () => {
        setTimeout(() => {
        setTodos(todos.filter((el) => el.id !== todo.id))
    }, 250);
    };

const [isOpen, setIsOpen] = useState(false);
const [isBlack, setIsBlack] = useState(true);

    const delStateHandler = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item, isTrashed: !item.isTrashed,
                }
            } else {
                return item
            }
        }))
    }

    
    let checkComplete = todo.completed;
    let checkTrashed = todo.isTrashed;

    const animOptionsHandler = (check, deleteCheck) => {
        switch(true) {
            case (check === true && deleteCheck === false):
                return "doneTodo";
                break;
            case (check === false && deleteCheck === true):
                return "deleteAnim";
                break;
            case (check === false && deleteCheck === false):
                return "";
                break;
            case (check === true && deleteCheck === true):
                return "deleteAnim";
                break;
            default:
                return "";
        }
    }

    const totalHandler = () => {
        delStateHandler()
        deleteHandler()
    }


    const completeHandler = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item, completed: !item.completed,
                }
            } else {
                return item
            }
        }))
    };

    const isArchivedHandler = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item, isArchived: !item.isArchived,
                }
            } else {
                return item
            }
        }))
    };

    const variants = {
        done: { opacity: 1, x: 0},
        pending: { opacity: 0.55, size: 1},
        doneTodo: {opacity: 0.75},
        deleteAnim: {opacity: 0.1, transitionDuration: 250}
    };

    const copyHandler = () => {
        navigator.clipboard.writeText(Object.values({text}));
        setShow(true);
        const timer = () => {
            const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
                setShow(false)
            }, 3000)
            return () => {
                clearTimeout(timeId)
            }
        }
        timer()
    }

    
    const starHandler = () => {
        setStar(!star);
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item, isStarred: !item.isStarred,
                }
            } else {
                return item
            }
        }))
        }

    return (
    <motion.div
        className="todo"
        variants={variants}
        style={{backgroundColor: isBlack ? "rgba(0, 0, 0, 0.5)" : "rgba(72, 133, 237, 0.75)"}}
        animate={animOptionsHandler(checkComplete, checkTrashed)}
        drag="x, y">
        <div className="holder-top">
            <motion.button
                className={todo.isStarred === true ? "btn sDone" : "btn star"}
                onClick={starHandler}
            >
            </motion.button>
            {/* The text of the Todo. This comes from the form ---> Todolist maps it ----> the component gets added with the variable of text changed, an ID, trash check*/}
            <li
            className="todo-item">
                {text}
            </li>

            <motion.button
                animate={todo.completed === true ? "done" : "pending"}
                variants={variants}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.90}}
                onClick={completeHandler}
                className={todo.completed === true ? "btn complete done" : "btn complete"}>
            </motion.button>
        </div>
        
        <div className="holder-btm" style={{opacity: isOpen ? 0.75 : 1, justifyContent: isOpen ? "space-between" : "flex-end" }}>

                {(isOpen === true) ? (
                    <>
                    <motion.button
                        className="btn copy"
                        title="press to copy"
                        onClick={copyHandler}
                        variants={variants}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.90}}>
                    </motion.button>

                    <motion.button
                        className="btn color"
                        title="press to change background color"
                        onClick={() => setIsBlack(!isBlack)}
                        variants={variants}
                        whileHover={{scale: 1.15}}
                        whileTap={{scale: 0.90}}>
                    </motion.button>
            
                    <motion.button
                        className="btn archive"
                        title="press to archive the note"
                        onClick={isArchivedHandler}
                        variants={variants}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.90}}>
                    </motion.button>
            
                    <motion.button
                        onClick={totalHandler}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.90}}
                        variants={variants}
                        className="btn trash"
                        title="press to archive the note">
                    </motion.button>
                    
                    </>
            ) : ("")}
            <motion.button
                className="btn more"
                onClick={() => setIsOpen(!isOpen)}
                animate={{ 
                    rotate: isOpen ? 90 : 0,
                    x: isOpen ? "-5px" : 0
                }}
                variants={variants}
                whileHover={{scale: 1.25}}
                whileTap={{scale: 0.80}}>
            </motion.button>
            </div>
        </motion.div>
    );
}

export default Todo;
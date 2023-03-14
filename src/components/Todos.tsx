import React,{useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import {TodosContext} from '../store/todos-context';

import classes from './Todos.module.css';

const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const {items} = todosCtx;

    useEffect(() => {
        console.log("Todos updated!");
    },[items])
    return (
        <ul className={classes.todos}>
            <p>Tap over Todos to delete</p>
            {todosCtx.items.map(todo => (
                <TodoItem key={todo.id} text={todo.text} onRemoveTodo={todosCtx.removeTodo.bind(null,todo.key)}/>
            ))}
        </ul>
    )
}

export default Todos;
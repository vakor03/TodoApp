import React, { useState } from 'react';
import TodoForm from '../todo-form/todo-form.component';
import { CgEditFlipH, CgCloseR } from 'react-icons/cg';

function Todo({ todo, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        task: '',
        completed: false,
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value.task);
        setEdit({
            id: null,
            task: '',
            completed: false,
        });
    };

    return edit.id !== todo.id ? (
        <>
            <div className={todo.completed ? 'todo-row complete' : 'todo-row'}>
                <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                    {todo.task}
                </div>
                <div className={'icons'}>
                    <CgCloseR
                        onClick={() => removeTodo(todo.id, todo.completed)}
                        className="delete-icon"
                    />
                    <CgEditFlipH
                        onClick={() =>
                            setEdit({
                                id: todo.id,
                                task: todo.task,
                                completed: todo.completed,
                            })
                        }
                        className="edit-icon"
                    />
                </div>
            </div>
        </>
    ) : (
        <>
            <TodoForm edit={edit} onSubmit={submitUpdate} />
        </>
    );
}

export default Todo;

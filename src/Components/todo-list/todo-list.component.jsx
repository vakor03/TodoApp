import React, { useState } from 'react';
import TodoForm from '../todo-form/todo-form.component';
import Todo from '../todo/todo.component';
import { useMutation, useSubscription } from '@apollo/client';
import {
    AddTodoMutation,
    RemoveTodoMutation,
    UpdateTodoMutation,
    CompleteTodoMutation,
} from '../../HasuraAPI/MutationsGraphQL';
import { SubscribeTodo } from '../../HasuraAPI/SubscriptionsGraphQL';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../spinner/spinner.component';

function TodoList() {
    const [updateTodo] = useMutation(UpdateTodoMutation);
    const [removeTodo] = useMutation(RemoveTodoMutation);
    const [completeTodo] = useMutation(CompleteTodoMutation);
    const [addTodo] = useMutation(AddTodoMutation);
    const { data, loading, error } = useSubscription(SubscribeTodo);
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        loading: authLoading,
    } = useAuth0();

    const offlineMessage =
        'You are currently offline, all functions are disabled!';
    const [isoffline, setOffline] = useState(false);

    function showOfflineMessage() {
        alert(offlineMessage);
    }

    window.onoffline = () => {
        setOffline(true);
    };

    window.ononline = () => {
        setOffline(false);
    };

    const AddNewTodo = props => {
        if (!props.task || /^\s*$/.test(props.text)) {
            return;
        }

        if (isoffline) {
            showOfflineMessage();
            return;
        }
        const variables = {
            title: props.task,
        };

        addTodo({ variables });
    };

    const CompleteTodo = (id, completed) => {
        if (isoffline) {
            showOfflineMessage();
            return;
        }
        const variables = {
            id: id,
            completed: !completed,
        };

        completeTodo({ variables });
    };

    const RemoveTodo = id => {
        if (isoffline) {
            showOfflineMessage();
            return;
        }
        const variables = {
            id: id,
        };

        removeTodo({ variables });
    };

    const UpdateTodo = (id, newValue) => {
        if (!newValue || /^\s*$/.test(newValue.text)) {
            return;
        }
        if (isoffline) {
            showOfflineMessage();
            return;
        }
        const variables = {
            id: id,
            title: newValue,
        };
        updateTodo({ variables });
    };

    if (loading || authLoading) {
        return (
            <div>
                <h1>Wait a second</h1>
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Please log in to start:</h1>
                <button
                    onClick={() => loginWithRedirect()}
                    className={'auth-button'}>
                    Log In
                </button>
            </div>
        );
    }

    if (error) {
        return <p>Error</p>;
    }

    return (
        <div>
            <h1>What&apos;s the plan for Today?</h1>
            <TodoForm onSubmit={AddNewTodo} />
            {data.todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={{
                        id: todo.id,
                        task: todo.title,
                        completed: todo.completed,
                    }}
                    completeTodo={CompleteTodo}
                    removeTodo={RemoveTodo}
                    updateTodo={UpdateTodo}
                />
            ))}
            <button onClick={() => logout()} className={'auth-button'}>
                Log out
            </button>
        </div>
    );
}

export default TodoList;

import {React} from "react";
import TodoForm from "../todo-form/todo-form.component";
import Todo from "../todo/todo.component";
import {useMutation, useSubscription} from "@apollo/client";
import {
    AddTodoMutation,
    RemoveTodoMutation,
    UpdateTodoMutation,
    CompleteTodoMutation
} from "../../HasuraAPI/MutationsGraphQL";
import {SubscribeTodo} from "../../HasuraAPI/SubscriptionsGraphQL";
import {useAuth0} from "@auth0/auth0-react";


function TodoList() {
    const [updateTodo] = useMutation(UpdateTodoMutation);
    const [removeTodo] = useMutation(RemoveTodoMutation);
    const [completeTodo] = useMutation(CompleteTodoMutation);
    const [addTodo, {loading: addTodoLoading}] = useMutation(AddTodoMutation);
    const {data, loading, error} = useSubscription(SubscribeTodo);
    const {
        loginWithRedirect, logout, isAuthenticated, loading: authLoading,
    } = useAuth0();

    const AddNewTodo = (props) => {
        if (!props.task || /^\s*$/.test(props.text)) {
            return;
        }

        const variables = ({
            title: props.task,
        });

        addTodo({variables});
    };

    const CompleteTodo = (id, completed) => {
        const variables = ({
            id: id,
            completed: !completed,
        });

        completeTodo({ variables });
    };

    const RemoveTodo = (id) => {
        const variables = ({
            id: id,
        });

        removeTodo({variables});
    };

    const UpdateTodo = (id, newValue) => {
        if (!newValue || /^\s*$/.test(newValue.text)) {
            return;
        }

        const variables = ({
            id: id,
            title: newValue,
        });
        updateTodo( {variables});
    };

    if (loading || authLoading){
        return <p>Loading</p>;
    }

    if (!isAuthenticated){
        return <p>You are not authenticated</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

    return (

        <div>
            <h1>What's the plan for Today?</h1>
            <TodoForm onSubmit={AddNewTodo}></TodoForm>
            {data.map((todo) => (
                <Todo todo={{
                    id: todo.id,
                    task: todo.title,
                    completed: todo.completed,
                }}
                      completeTodo={CompleteTodo}
                      removeTodo={RemoveTodo}
                      updateTodo={UpdateTodo}
                />
            ))}
        </div>

    )
}

export default TodoList;
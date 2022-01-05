import {React, useState} from "react";
import TodoForm from "../todo-form/todo-form.component";
import Todo from "../todo/todo.component";
import {useMutation, useSubscription} from "@apollo/client";
import {AddTodo, RemoveTodo, UpdateTodo} from "../../HasuraAPI/MutationsGraphQL";
import {SubscribeTodo} from "../../HasuraAPI/SubscriptionsGraphQL";
import {useAuth0} from "@auth0/auth0-react";



function TodoList() {
    const [todos, setTodos] = useState([]);
    const [currId, setCurrId] = useState(0);
    const [updateTodo] = useMutation(UpdateTodo);
    const [removeTodo] = useMutation(RemoveTodo);
    const [addTodo, { loading: addTodoLoading }] = useMutation(AddTodo);
    const { data, loading, error } = useSubscription(SubscribeTodo);
    const {
        loginWithRedirect, logout, isAuthenticated, loading: authLoading,
    } = useAuth0();

    const AddNewTodo = (props) => {
        if (!props.task || /^\s*$/.test(props.text)) {
            return;
        }

        const newTodo = ({
            id: currId,
            task: props.task,
            completed: false
        });

        const newTodos = [newTodo, ...todos];
        setTodos(newTodos);
        setCurrId(currId + 1);
    };

    const CompleteTodo = (id, completed) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const RemoveTodo = (id) => {
        let removeTodos = [...todos].filter(todo => todo.id !== id);
        setTodos(removeTodos);
    };

    const UpdateTodo = (id, newValue) => {
        if (!newValue || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(
            todos.map(todo => {
                    if (todo.id === id) {
                        todo.task = newValue;
                    }
                    return todo;
                }
            )
        );
    };
    return (

        <div>
            <h1>What's the plan for Today?</h1>
            <TodoForm onSubmit={addTodo}></TodoForm>
            {todos.map((todo) => (
                <Todo todo={todo}
                      completeTodo={CompleteTodo}
                      removeTodo={RemoveTodo}
                      updateTodo={UpdateTodo}
                />
            ))}
        </div>

    )
}

// read = () => {
//
//     startFetchMyQuery("Get", null).then(res => {
//         this.setState({todos: res.todos}, ()=>this.setState({currentId: res.todos.last ? res.todos.last.id + 1 : 1}));
//     });
//
// }


export default TodoList;
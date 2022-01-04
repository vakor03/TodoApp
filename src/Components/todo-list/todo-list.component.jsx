import React from "react";
import TodoForm from "../todo-form/todo-form.component";
import Todo from "../todo/todo.component";
import {startFetchMyQuery} from "../../HasuraAPI/GraphQL";

import {Component} from "react";

class TodoList extends Component {

    constructor() {
        super();

        this.state = {
            todos: [],
            currentId: 0
        };

        this.read();
    }

    read = () => {
        startFetchMyQuery("Get", null).then(res => {
            this.setState({todos: res.todos}, ()=>this.setState({currentId: res.todos.last ? res.todos.last.id + 1 : 1}));
        });

    }

    render() {
        const todos = this.state.todos;
        const addTodo = (props) => {
            if (!props.task || /^\s*$/.test(props.text)) {
                return;
            }

            startFetchMyQuery("AddTodo", props);
            const newTodo = ({
                id: this.state.currentId,
                task: props.task,
                completed: false
            });
            const newTodos = [newTodo, ...todos];
            this.setState({todos: newTodos});

            this.setState({currentId: this.state.currentId + 1});
        };

        const completeTodo = (id, completed) => {
            startFetchMyQuery("CompleteTodo", {"id": id, "completed": !completed});
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            });
            this.setState({todos: updatedTodos});
        };

        const removeTodo = (id) => {
            startFetchMyQuery("RemoveTodo", id);
            let removeTodos = [...todos].filter(todo => todo.id !== id);
            this.setState({todos: removeTodos});
        };

        const updateTodo = (id, newValue) => {
            if (!newValue || /^\s*$/.test(newValue.text)) {
                return;
            }
            console.log(newValue);
            startFetchMyQuery("UpdateTodo", {
                "id": id,
                "task": newValue
            });
            this.setState({
                todos: todos.map(todo => {
                        if (todo.id === id) {
                            todo.task = newValue;
                        }
                        return todo;
                    }
                )
            });
        };

        return (

            <div>
                <h1>What's the plan for Today?</h1>
                <TodoForm onSubmit={addTodo}></TodoForm>
                {todos.map((todo) => (
                    <Todo todo={todo}
                          completeTodo={completeTodo}
                          removeTodo={removeTodo}
                          updateTodo={updateTodo}
                    />
                ))}
                {/*<Todo*/}

                {/*    todo={todos[0]}*/}
                {/*    completeTodo={completeTodo}*/}
                {/*    removeTodo={removeTodo}*/}
                {/*    updateTodo={updateTodo}*/}
                {/*/>*/}

            </div>

        )
    }


}

export default TodoList;
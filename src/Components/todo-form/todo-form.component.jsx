import React, {useState, useEffect, useRef} from "react";

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.task : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            task: input
        });

        setInput('')
    };

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <form className={"todo-form"} onSubmit={handleSubmit}>

            {props.edit ? (
                    <><input
                        type={"text"}
                        placeholder={"Update your item"}
                        value={input}
                        name={"text"}
                        className={"todo-input edit"}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                        <button className={"todo-button edit"}>Update</button>
                    </>) :
                <>
                    <input
                        type={"text"}
                        placeholder={"Add new todo"}
                        value={input}
                        name={"text"}
                        className={"todo-input"}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className={"todo-button"}>Add todo</button>
                </>
            }


        </form>
    )
}

export default TodoForm
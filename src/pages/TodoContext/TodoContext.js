
import React from "react";

// Styles
import "./todo.css";

// Components
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

// State
import TodoState from "../../contexts/TodoState"

const TodoContext = () => {
    
    return(
        <React.Fragment>
            <TodoState>
                <div className='container flex flex-col mt-4'>
                    <h1 className='text-center'>Todo App With Context</h1>
                    {/* Todo Form */}
                    <TodoForm />
                    {/* Todo List */}
                    <div className='flex flex-col mt-4'>
                    <TodoList />
                    </div>
                </div>
            </TodoState>
        </React.Fragment>
    )
}

export default TodoContext
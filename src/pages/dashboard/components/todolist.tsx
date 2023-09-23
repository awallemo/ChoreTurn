import styled from "styled-components"
import { useState } from "react"
import { Button, TextField } from "@mui/material"
import { Todo } from "../../../models/todoModel"
import { TodoItem } from "./todo"

//TODO: Hent ut todos fra db og send tittel, description og assignee
const TodoListContainer = styled.div`
display: flex;
flex-direction: column;
margin: auto;
/* max-width: 300px; */
`

const TextFieldContainer = styled.div`
`
export const Todolist = () => {
 
const [todos, setTodos] = useState<Todo[]>([]);
const [title, setTitle] = useState<string>('');
const [description, setDescription] = useState<string>('');
const [error, setError] = useState<boolean>();
const [errorMessage, setErrorMessage] = useState<string>('');



const addTodo = () => {
    
    invalidInputHandler(title, description)
    if (!title || !description) {
        return false
    }
    console.log(title)
    const newTodoId = Math.random()
    const newTodo = {
        id: newTodoId,
        title: title, // Set your actual title
        description: description, // Set your actual description
        createdAt: new Date()
    } as Todo;
    setTodos([...todos, newTodo]);
}

const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
}

const invalidInputHandler = (firstInput : string, secondInput : string) => {
    
    if (firstInput === '' || secondInput === '') {
        setError(true)
        setErrorMessage('Please fill out all fields')
        return false
    }
    else {
        setError(false)
        return true
    }
}

return (
    <TodoListContainer>
        
        {todos.map(todo => (
                <TodoItem key={todo.id} title={todo.title} description={todo.description} deleteFn={() => deleteTodo(todo.id)} />
        ))}
        
        <TextField
            label="Title"
            placeholder="Add title" 
            sx={{marginTop: "20px", marginBottom: "10px"}} 
            onChange={(e) => setTitle(e.target.value)}
            error={error ? true : false}
            helperText={errorMessage}
        />
        <TextField
            label="Description"
            placeholder="Add description" 
            sx={{marginBottom: "10px"}}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            error={error ? true : false}
            helperText={errorMessage}
        />
        
        <Button variant="contained" sx={{
                    width: 'max-content',
                    margin: 'auto',
                }} 
                onClick={addTodo}>
                Add Todo
        </Button>
        
        
    </TodoListContainer>
);
}
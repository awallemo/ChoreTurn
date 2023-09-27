import {useContext, useState} from "react";
import {Textarea, Input, Box, Button} from '@chakra-ui/react'
import {Todo} from "../../../models/todoModel.ts";
import {TodoContext} from "../../../contexts/todoContext.ts";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 300px; 
  display:flex; 
  flex-direction: column; 
  align-items: center;
`

export const CreateTodo = () => {
    const {todos, setTodos} = useContext(TodoContext)
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>('');
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
    const addTodo = async () => {
        invalidInputHandler(title, description)
        if (!title || !description) {
            return false
        }
        const newTodo = {
            title: title, // Set your actual title
            description: description, // Set your actual description
            created: new Date()
        } as Todo;

        await fetch('http://127.0.0.1:8090/api/collections/Todos/records',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                newTodo
            )
        })
        todos && setTodos([...todos, newTodo]);
    }
    return (
        <FormContainer>
            <Box mt='1'
                 fontWeight='semibold'
                 as='h4'
                 lineHeight='tight'
                 noOfLines={1}>
                Create a new todo
            </Box>
            <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={error}
            />
            <Textarea
                placeholder="Content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={error}
                size='sm'
            />
            {error && <p>{errorMessage}</p>}

            {/*<Select placeholder='Select option' onChange = {(e) => setUser(e.target.value)}>*/}
            {/*    {props.users?.map((user: any, index: number)=> {*/}
            {/*        return <option key={index} value={user} >{user.Name}</option>*/}
            {/*    })}*/}
            {/*</Select>*/}
            <Button colorScheme='teal' size='sm' onClick={() => addTodo()}>
                Create note
            </Button>
        </FormContainer>
    );
};
import {useContext, useEffect, useState} from "react";
import {Textarea, Input, Box, Button, Select} from '@chakra-ui/react'
import {Todo} from "../../../models/todoModel.ts";
import {DashboardContext} from "../../../contexts/dashboardContext.ts";
import styled from "styled-components";
import {User} from "../../../models/userModel.ts";

const FormContainer = styled.div`
  max-width: 300px; 
  display:flex; 
  flex-direction: column; 
  align-items: center;
`

export const CreateTodo = () => {
    const {todos, setTodos, users} = useContext(DashboardContext)
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [user, setUser] = useState<string>()
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>('')
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
        // const newTodo = {
        //     title: title, // Set your actual title
        //     description: description, // Set your actual description
        //     created: new Date()
        // } as Todo;

        await fetch('http://127.0.0.1:8090/api/collections/Todos/records',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    title: title,
                    description: description,
                    created: new Date(),
                    AssignedUser: users?.find((u) => u.name === user)?.id
                }
            )
        })
        console.log(users?.find((u) => u.name === user)?.id)
        todos && setTodos([...todos, {title: title, description: description, created: new Date()} as Todo]);

        await fetch('http://127.0.0.1:8090/api/collections/Users/records/',{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    name: user,
                    assignedTodos: todos?.find((t) => t.title === title)?.id //Har ikke fått id enda så er undefined her. Utforsk tanken med å kjøre en useEffect som trigges av den andre await fetchen kanskje?
                }
            )
        })
        console.log(user)
        console.log(title)
        console.log(todos?.find((todo) => todo.title === title))
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

            <Select placeholder='Select option' value={user} onChange = {(e) => setUser(e.target.value)}>
                {users?.map((user: any, index: number)=> {
                    return <option key={index} value={user.name} >{user.name}</option>
                })}
            </Select>
            <Button colorScheme='teal' size='sm' onClick={() => addTodo()}>
                Create note
            </Button>
        </FormContainer>
    );
};
import { Todolist } from "./components/todolist"
import Header from '../../components/header/header'
import styled from 'styled-components'
import {TodoContext} from "../../contexts/todoContext.ts";
import {useEffect, useState} from "react";
import {Todo} from "../../models/todoModel.ts";
import {CreateTodo} from "./components/createTodo.tsx";


const DashBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const Dashboard = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() =>{
        /*getTodos()*/
        fetch('http://127.0.0.1:8090/api/collections/Todos/records').then(
            response => response.json()
        ).then(
            data => {
                console.log("DATA directly from pocketbase with useEffect", data)
                setTodos(data.items)
            }
        )
    },[])
    return (
        //dashboard components
        <DashBoardContainer>
            <TodoContext.Provider value={{todos, setTodos}}>
                <Header title="{title....}" subtitle="{Lorem ipsum dolor sit amet..}" />
                <Todolist />
                <CreateTodo/>
            </TodoContext.Provider>
        </DashBoardContainer>
    )
}
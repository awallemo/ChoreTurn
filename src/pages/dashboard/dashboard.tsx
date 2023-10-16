import { Todolist } from "./components/todolist"
import Header from '../../components/header/header'
import styled from 'styled-components'
import {DashboardContext} from "../../contexts/dashboardContext.ts";
import {useEffect, useState} from "react";
import {Todo} from "../../models/todoModel.ts";
import {CreateTodo} from "./components/createTodo.tsx";
import {User} from "../../models/userModel.ts";


const DashBoardContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
`


export const Dashboard = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<User[]>([])

    useEffect(() =>{
        /*getTodos()*/
        fetch('http://127.0.0.1:8090/api/collections/Todos/records').then(
            response => response.json()
        ).then(
            data => {
                setTodos(data.items)
            }
        )

        fetch('http://127.0.0.1:8090/api/collections/Users/records').then(
            response => response.json()
        ).then(
            data => {
                setUsers(data.items)
            }
        )

    },[])
    return (
        //dashboard components
        <DashBoardContainer>
            <DashboardContext.Provider value={{todos, setTodos, users, setUsers}}>
                <Header title="{title....}" subtitle="{Lorem ipsum dolor sit amet..}" />
                <Todolist />
                <CreateTodo/>
            </DashboardContext.Provider>
        </DashBoardContainer>
    )
}
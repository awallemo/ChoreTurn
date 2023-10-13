import styled from "styled-components"
import {useContext} from "react"
import { TodoItem } from "./todo"
import {DashboardContext} from "../../../contexts/dashboardContext.ts";

//TODO: Hent ut todos fra db og send tittel, description og assignee
const DashboardContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  max-width: 1000px; 
  margin: auto;
`
const TodoContainer = styled.div`
    @media (min-width: 768px){
      display: flex;
      flex-wrap: wrap;
    } 
`

export const Todolist = () => {

    const {todos} = useContext(DashboardContext)


return (
    <DashboardContainer>
        <TodoContainer>
            {todos?.map(todo => (
                <TodoItem key={todo.id} id={todo.id} title={todo.title} content={todo.description} created={todo.created} />
            ))}
        </TodoContainer>
    </DashboardContainer>
);
}
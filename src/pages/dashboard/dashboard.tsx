import { Todolist } from "./components/todolist"
import Header from '../../components/header/header'
import styled from 'styled-components'



const DashBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
`


export const Dashboard = () => {
    return (
        //dashboard components
        <DashBoardContainer> 
            <Header title="{title....}" subtitle="{Lorem ipsum dolor sit amet..}" />
            <Todolist />
        </DashBoardContainer>
    )
}
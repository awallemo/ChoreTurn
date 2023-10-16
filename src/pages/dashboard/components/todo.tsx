import {Card, CardBody, CardFooter, CardHeader, Heading, Text, IconButton, Box} from "@chakra-ui/react";
import {Delete} from "@mui/icons-material";
import {useContext} from "react";
import {DashboardContext} from "../../../contexts/dashboardContext.ts";
import {Todo} from "../../../models/todoModel.ts";

export const TodoItem = ({ todoProp }: { todoProp: Todo }) => {

    const { id, title, description, created, assignedUser } = todoProp
    const { todos, setTodos } = useContext(DashboardContext)
    const { users } = useContext(DashboardContext)

    const userName = users?.find((u) => u.id === assignedUser)?.name

    const deleteTodoFromDb = async (id: number) => {
        console.log("DELTE ID", id)
        await fetch(`http://127.0.0.1:8090/api/collections/Todos/records/${id}`,
            {
                method: 'delete'
            }
        )
        const updatedTodos = todos?.filter(todo => todo.id !== id);
        updatedTodos && setTodos(updatedTodos);
    }

    return(
        <Box sx={{ maxWidth: "250px", padding:"10px"}}>
        <Card >
            <CardHeader sx={{textAlign: "center"}}>
                <Heading as='h4' size='md' sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</Heading>
            </CardHeader>
            <CardBody sx={{textAlign: "center"}}>
                <Text>{description}</Text>
            </CardBody>

            <CardFooter sx={{display: "block", textAlign: "center"}}>
                <Text fontSize={"13px"} >Assigned to: {userName}</Text>
                <Text fontSize={"10px"} fontFamily={"cursive"}>Created at: {created.toLocaleString()}</Text>
                <IconButton aria-label={"Delete"} icon={<Delete/>} onClick={() => deleteTodoFromDb(id)}></IconButton>
                {/*<Text fontSize={"10px"} fontFamily={"bold"}>{user}</Text>*/}
            </CardFooter>
        </Card>
        </Box>
    )
}
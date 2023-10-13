import {Card, CardBody, CardFooter, CardHeader, Heading, Text, IconButton, Box} from "@chakra-ui/react";
import {Delete} from "@mui/icons-material";
import {useContext} from "react";
import {DashboardContext} from "../../../contexts/dashboardContext.ts";

export const TodoItem = (
    {   id,
        title,
        content,
        created,
      }:
        {   id: number,
            title: string,
            content: string,
            created?: Date
        }
) => {
    const {todos, setTodos} = useContext(DashboardContext)
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

    console.log("todo id", id)
    return(
        <Box sx={{ maxWidth: "250px", padding:"10px"}}>
        <Card >
            <CardHeader>
                <Heading as='h4' size='md' sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</Heading>
            </CardHeader>
            <CardBody sx={{}}>
                <Text>{content}</Text>
            </CardBody>

            <CardFooter sx={{justifyContent: "space-between"}}>
                {created && <Text fontSize={"10px"} fontFamily={"cursive"}>Created: {created.toLocaleString()}</Text>}
                <IconButton aria-label={"Delete"} icon={<Delete/>} onClick={() => deleteTodoFromDb(id)}></IconButton>
                {/*<Text fontSize={"10px"} fontFamily={"bold"}>{user}</Text>*/}
            </CardFooter>
        </Card>
        </Box>
    )
}
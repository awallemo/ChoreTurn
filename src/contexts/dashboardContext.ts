import {createContext, Dispatch, SetStateAction} from "react";
import {Todo} from "../models/todoModel.ts";
import {User} from "../models/userModel.ts";

export const DashboardContext = createContext<{todos: Todo[] | undefined, users: User[] | undefined, setTodos: Dispatch<SetStateAction<Todo[]>>,  setUsers: Dispatch<SetStateAction<User[]>>}>({
    todos: undefined,
    users: undefined,
    setTodos: () => {},
    setUsers: () => {}
})
/*
export const TodoContext = createContext({
    todos: undefined,
    setTodos: () => {}
})*/

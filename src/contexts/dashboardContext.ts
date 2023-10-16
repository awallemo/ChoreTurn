import {createContext, Dispatch, SetStateAction} from "react";
import {Todo} from "../models/todoModel.ts";
import {User} from "../models/userModel.ts";

export const DashboardContext = createContext<{todos: Todo[] , users: User[] , setTodos: Dispatch<SetStateAction<Todo[]>>,  setUsers: Dispatch<SetStateAction<User[]>>}>({
    todos: [],
    users: [],
    setTodos: () => {},
    setUsers: () => {}
})
/*
export const TodoContext = createContext({
    todos: undefined,
    setTodos: () => {}
})*/

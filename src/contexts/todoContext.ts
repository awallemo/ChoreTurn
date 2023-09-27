import {createContext, Dispatch, SetStateAction} from "react";
import {Todo} from "../models/todoModel.ts";

export const TodoContext = createContext<{todos: Todo[] | undefined, setTodos: Dispatch<SetStateAction<Todo[]>> }>({
    todos: undefined,
    setTodos: () => {}
})
/*
export const TodoContext = createContext({
    todos: undefined,
    setTodos: () => {}
})*/

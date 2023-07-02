import {toDoListType} from "../App";
import {v1} from "uuid";
import {removeTaskAC} from "./tasks-reducer";


export type RemoveTodoListAT = ReturnType<typeof RemoveTodolistAC>

export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

export type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>

export type ChangeTodoListFilterAT = ReturnType<typeof ChangeTodoListFilterAC>

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<toDoListType> = []

export const todoListsReducer = (state = initialState , action: ActionType): Array<toDoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodo: toDoListType = {
            id: action.todoListId,
            title: action.title,
            filter: "All",
        }
        return [...state, newTodo]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }

}

export const AddTodoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", title: title, todoListId: v1()} as const
}

export const RemoveTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}

export const ChangeTodoListTitleAC = (toDoListId: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: toDoListId, title} as const
}

export const ChangeTodoListFilterAC = (toDoListId: string, filter: "All" | "Active" | "Completed") => {
    return {type: "CHANGE-TODOLIST-FILTER", id: toDoListId, filter} as const
}
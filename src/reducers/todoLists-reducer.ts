import {toDoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT= {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: "All" | "Active" | "Completed"
    id: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<toDoListType>, action: ActionType): Array<toDoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodo: toDoListType = {
            id: v1(),
            title: action.title,
            filter: "All",
        }
        return [...todoLists, newTodo]

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return todoLists
    }




}
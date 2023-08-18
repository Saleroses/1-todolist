import {TaskStateType, toDoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todoLists-reducer";


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type AddTaskAT = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,
            [action.todoListId]: state[action.todoListId]
                .filter( (task)=> task.id !== action.taskId)}

        case "ADD-TASK":
            return {...state,
            [action.toDoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.toDoListId]]
            }

        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.toDoListId]: state[action.toDoListId]
                    ?.map( (t)=> t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }

        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId]
                    ?.map((t) => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }

        case "ADD-TODOLIST":
            return {...state, [action.todoListId]: []

            }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: "REMOVE-TASK", taskId, todoListId } as const
}

export const addTaskAC = (title: string, toDoListId: string) => {
    return {type: "ADD-TASK", title, toDoListId} as const
}

export const changeTaskStatusAC = (toDoListId: string, taskId: string, isDone: boolean) => {
    return {type: "CHANGE-TASK-STATUS", toDoListId, isDone, taskId} as const
}

export const changeTaskTitleAC = (toDoListId: string, taskId: string, newTitle: string) => {
    return {type: "CHANGE-TASK-TITLE", toDoListId, taskId, newTitle} as const
}

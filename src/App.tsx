import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "All" | "Active" | "Completed"

export type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [toDoListId: string]: Array<TaskType>
}


function App(): JSX.Element {
    const toDoListId_1 = v1()
    const toDoListId_2 = v1()
    const [toDoList, setToDoList] = useState<Array<toDoListType>>([
        {id: toDoListId_1, title: "What to learn", filter: "All"},
        {id: toDoListId_2, title: "What to buy", filter: "All"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: false},
            {id: v1(), title: "ES6/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [toDoListId_2]: [
            {id: v1(), title: "Veg", isDone: true},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Cars", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })


    const removeTask = (taskId: string, toDoListId: string) => {
        // const taskForUpdate: Array<TaskType> = tasks [toDoListId]
        // const resultOfUpdate: Array<TaskType> = taskForUpdate.filter( (tasks) => tasks.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[toDoListId] = resultOfUpdate
        // setTasks(copyTasks)
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].filter((tasks) => tasks.id !== taskId)})

    }
    const addTask = (title: string, toDoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const taskForUpdate: Array<TaskType> = tasks [toDoListId]
        // const resultOfUpdate: Array<TaskType> = [newTask,...taskForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[toDoListId] = resultOfUpdate
        // setTasks(copyTasks)
        setTasks({...tasks, [toDoListId]: [newTask, ...tasks[toDoListId]]})

    }
    const changeTasksStatus = (taskId: string, newIsDone: boolean, toDoListId: string) => {
        setTasks({
            ...tasks, [toDoListId]: tasks[toDoListId].map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t)
        })
    }
    const changeTodoListFilter = (filter: FilterValuesType, toDoListId: string) => {
        setToDoList(toDoList.map(tl => tl.id === toDoListId ? {...tl, filter: filter} : tl))
    }
    const removeToDoList = (toDoListId: string) => {
        setToDoList(toDoList.filter(tl => tl.id !== toDoListId))
        delete tasks[toDoListId]
    }

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "Active":
                return tasksList.filter(t => t.isDone === false)
            case "Completed":
                return tasksList.filter(t => t.isDone === true)
            default:
                return tasksList
        }
    }

    const toDoListComponents = toDoList.map(tl => {
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                toDoListId={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                removeTask={removeTask}
                filter={tl.filter}
                addTask={addTask}
                changeTasksStatus={changeTasksStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeToDoList={removeToDoList}
            />
        )
    })

    return (
        <div className="App">
            {toDoListComponents}
        </div>
    );
}

export default App;

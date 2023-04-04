import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "All"|"Active"|"Completed"

function App(): JSX.Element {

    const [tasks, setTasks] = useState <Array<TaskType>> ([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: false},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task)=> task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTasksStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map (t => t.id === taskId ? {...t, isDone: newIsDone} : t) )
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const [filter, setFilter] = useState <"All"|"Active"|"Completed">("All")

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "Active":
                return tasksList.filter(t => t.isDone === false)
            case "Completed":
                return  tasksList.filter(t => t.isDone === true)
            default:
                return tasksList
        }
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={getFilteredTasksForRender(tasks, filter)}
                      removeTask={removeTask}
                      filter={filter}
                      addTask={addTask}
                      changeTasksStatus={changeTasksStatus}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;

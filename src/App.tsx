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

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const [filter, setFilter] = useState <"All"|"Active"|"Completed">("All")
    let tasksForRender: Array<TaskType> = []
    if (filter === "All") {
        tasksForRender = tasks
    } if (filter === "Active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    } if (filter === "Completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;

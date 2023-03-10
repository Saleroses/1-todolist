import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterValuesType = "All"|"Active"|"Completed"

function App(): JSX.Element {

    const [tasks, setTasks] = useState <Array<TaskType>> ([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: false},
        {id: 3, title: "ES6/TS", isDone: false},
        {id: 4, title: "REDUX", isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task)=> task.id !== taskId))
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
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;

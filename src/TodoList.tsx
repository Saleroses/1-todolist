import React, {FC} from 'react';
import {FilterValuesType} from "./App";

type todolistPropsType = {
    title: string
    tasks: Array <TaskType>
    removeTask: (taskId: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: FC<todolistPropsType> = (props) => {

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if(props.tasks[i].isDone == true) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const toDoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const toDoListItems: Array<JSX.Element> = props.tasks.map((task)=>{
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>{props.removeTask(task.id)}}>x</button>
            </li>
        )
    })

    return (
        <div className={toDoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {toDoListItems}
            </ul>
            <div>
                <button onClick={()=>{props.changeTodoListFilter("All")}}>All</button>
                <button onClick={()=>{props.changeTodoListFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeTodoListFilter("Completed")}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
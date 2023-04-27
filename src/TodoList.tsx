import React, {ChangeEvent, FC, useRef, useState,KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type todolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean, toDoListId: string) => void
    toDoListId: string
    removeToDoList: (toDoListId: string) => void
    changeTasksTitle: (taskId: string, newTitle: string, toDoListId: string) => void
    changeTodoListTitle: (newTitle: string, toDoListId: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<todolistPropsType> = (props) => {


    //const addTaskInputRef = useRef<any>(null)

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone == true) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const toDoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"



    const toDoListItems: Array<JSX.Element> = props.tasks.map((task) => {

        const removeTaskHandler = () => {props.removeTask(task.id, props.toDoListId)}

        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTasksStatus(task.id, e.currentTarget.checked, props.toDoListId)

        const changeTasksTitle = (newTitle: string) => {
            props.changeTasksTitle(task.id, newTitle, props.toDoListId)
        }

        return (
            <li key={task.id}>
                <input
                    onChange={changeTasksStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan title={task.title}
                              classes={task.isDone ? "task-done" : "task"}
                              changeTitle={changeTasksTitle}/>
                <button onClick={removeTaskHandler}
                >x
                </button>
            </li>
        )
    })

    const addTask = (title: string) => {
        props.addTask(title, props.toDoListId)
    }
    
    const removeToDoList = () => {
        props.removeToDoList(props.toDoListId)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.toDoListId)
    }

    return (
        <div className={toDoClasses}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeToDoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} recommendedTitleLength={15} maxTitleLength={20}/>
            <ul>
                {toDoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "All" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("All", props.toDoListId)
                }}>All
                </button>
                <button
                    className={props.filter === "Active" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Active", props.toDoListId)
                }}>Active
                </button>
                <button
                    className={props.filter === "Completed" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Completed", props.toDoListId)
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
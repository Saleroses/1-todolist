import React, {ChangeEvent, FC, useRef, useState,KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type todolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<todolistPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

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

        const removeTaskHandler = () => {props.removeTask(task.id)}
        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTasksStatus(task.id, e.currentTarget.checked)

        return (
            <li>
                <input
                    onChange={changeTasksStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}
                >x
                </button>
            </li>
        )
    })

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError (true)
        }
        setTitle("")
    }

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)}
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined :
        (e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && addTaskHandler()}
    const longTitleWarning = (title.length > recommendedTitleLength && title.length < maxTitleLength) &&
        <div>Title must be shorter</div>
    const longTitleError = title.length > maxTitleLength && <div>Please STOP</div>
    const errorMessage = error && <div>Title is hard required!</div>

    return (
        <div className={toDoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "input-error" : ''}
                    placeholder={"Enter task title"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />

                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+</button>
                {longTitleWarning}
                {longTitleError}
                {errorMessage}
            </div>
            <ul>
                {toDoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "All" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("All")
                }}>All
                </button>
                <button
                    className={props.filter === "Active" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Active")
                }}>Active
                </button>
                <button
                    className={props.filter === "Completed" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
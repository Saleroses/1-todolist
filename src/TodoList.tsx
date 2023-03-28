import React, {ChangeEvent, FC, useRef, useState,KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type todolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<todolistPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")

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

        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}
                >x
                </button>
            </li>
        )
    })

    const addTaskHandler = () => {props.addTask(title)
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined :
        (e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && addTaskHandler()}
    const longTitleWarning = (title.length > recommendedTitleLength && title.length < maxTitleLength) && <div>Title must be shorter</div>
    const longTitleError = title.length > maxTitleLength && <div>Please STOP</div>

    return (
        <div className={toDoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
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
            </div>
            <ul>
                {toDoListItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter("All")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
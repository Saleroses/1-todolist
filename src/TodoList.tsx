import React, {ChangeEvent, FC, useRef, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import {red} from "@mui/material/colors";

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

        const removeTaskHandler = () => {
            props.removeTask(task.id, props.toDoListId)
        }

        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTasksStatus(task.id, e.currentTarget.checked, props.toDoListId)

        const changeTasksTitle = (newTitle: string) => {
            props.changeTasksTitle(task.id, newTitle, props.toDoListId)
        }

        return (
            <ListItem key={task.id}
                      divider
                      disablePadding
                      secondaryAction={<IconButton onClick={removeTaskHandler}>
                                        <ClearIcon fontSize={"small"}/>
                                        </IconButton>}
            >
                <Checkbox
                    size={"small"}
                    color={"secondary"}
                    onChange={changeTasksStatus}
                    checked={task.isDone}/>
                <EditableSpan title={task.title}
                              classes={task.isDone ? "task-done" : "task"}
                              changeTitle={changeTasksTitle}/>

            </ListItem>
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
            <Typography
                variant={"h5"}
                align={"center"}
                fontWeight={"bold"}
                fontSize={"20px"}
            >
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <Button
                    variant={"contained"}
                    size={"small"}
                    onClick={removeToDoList}
                    endIcon={<DeleteForeverIcon/>}
                    sx={{margin: "10px"}}
                >
                    Del
                </Button>
            </Typography>
            <AddItemForm addItem={addTask} recommendedTitleLength={15} maxTitleLength={20}/>
            <List>
                {toDoListItems}
            </List>
            <div className={"btn-container"}>
                <Button
                    variant={"contained"}
                    size={"small"}
                    disableElevation={true}
                    color={props.filter === "All" ? "secondary" : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("All", props.toDoListId)
                    }}>All
                </Button>
                <Button
                    variant={"contained"}
                    size={"small"}
                    disableElevation={true}
                    color={props.filter === "Active" ? "secondary" : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("Active", props.toDoListId)
                    }}>Active
                </Button>
                <Button
                    variant={"contained"}
                    size={"small"}
                    disableElevation={true}
                    color={props.filter === "Completed" ? "secondary" : "primary"}

                    onClick={() => {
                        props.changeTodoListFilter("Completed", props.toDoListId)
                    }}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;
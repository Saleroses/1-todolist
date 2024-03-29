import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean) => void
    changeTasksTitle: (taskId: string, newTitle: string) => void
}

export const Task = (props: TaskPropsType) => {
    const removeTaskHandler = () => {
        props.removeTask(props.task.id)
    }

    const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTasksStatus(props.task.id, newIsDoneValue)
    }

    const changeTasksTitle = (newTitle: string) => {

        props.changeTasksTitle(props.task.id, newTitle)
    }

    return (
        <ListItem
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
                checked={props.task.isDone}/>
            <EditableSpan title={props.task.title}
                          classes={props.task.isDone ? "task-done" : "task"}
                          changeTitle={changeTasksTitle}/>

        </ListItem>
    );
};
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    recommendedTitleLength: number
    maxTitleLength: number
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error
    const longTitleWarning = (title.length > recommendedTitleLength && title.length < maxTitleLength) &&
        <span>Title must be shorter</span>
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined :
        (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === "Enter" && addTaskHandler()
        }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const longTitleError = title.length > maxTitleLength && <span>Please STOP</span>
    const errorMessage = error && "Title is hard required!"


    return (
        <div>
            <TextField
                error={error}
                size={"small"}
                placeholder={"Enter task title"}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
                helperText={errorMessage || longTitleWarning || longTitleError}
            />
            <IconButton disabled={isAddTaskNotPossible}
                        onClick={addTaskHandler}>
                <AddBoxIcon/>
            </IconButton>

        </div>
    );
};


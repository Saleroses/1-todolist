import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
        <div>Title must be shorter</div>
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
    const longTitleError = title.length > maxTitleLength && <div>Please STOP</div>
    const errorMessage = error && <div>Title is hard required!</div>


    return (
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
            >+
            </button>
            {longTitleWarning}
            {longTitleError}
            {errorMessage}
        </div>
    );
};


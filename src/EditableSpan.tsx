import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, classes, changeTitle}) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const toggleEditMode = () => {
        if (isEditMode) {
            changeTitle(value)
        }
        setIsEditMode(!isEditMode)
    }

    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        isEditMode
            ? <input onBlur={toggleEditMode} autoFocus={true} value={value} onChange={setValueHandler}/>
            : <span className={classes} onDoubleClick={toggleEditMode}>
            {title}
            </span>
    );
};


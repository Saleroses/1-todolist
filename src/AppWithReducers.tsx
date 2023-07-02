import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar, Button, Checkbox,
    checkboxClasses, Container, createTheme, CssBaseline,
    FormControlLabel,
    FormGroup, Grid,
    IconButton, Paper, Switch, ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, lightBlue, lightGreen} from "@mui/material/colors";
import {
    ActionType, AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, RemoveTodolistAC,
    todoListsReducer
} from "./reducers/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";


export type FilterValuesType = "All" | "Active" | "Completed"

export type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [toDoListId: string]: Array<TaskType>
}


function AppWithReducers(): JSX.Element {
    const toDoListId_1 = v1()
    const toDoListId_2 = v1()
    const [toDoList, dispatchToDoList] = useReducer (todoListsReducer,[
        {id: toDoListId_1, title: "What to learn", filter: "All"},
        {id: toDoListId_2, title: "What to buy", filter: "All"},
    ])

    const [tasks, dispatchToTasks] = useReducer (tasksReducer, {
        [toDoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: false},
            {id: v1(), title: "ES6/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [toDoListId_2]: [
            {id: v1(), title: "Veg", isDone: true},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Cars", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })

    const [isDarkMode, setIsDarkMode] = useState(true)


    const removeTask = (taskId: string, toDoListId: string) => {
        ///////////// reducer
        const action = removeTaskAC(taskId, toDoListId)
        dispatchToTasks(action)
        //  или так dispatchToTasks(removeTaskAC(taskId, toDoListId))

    }
    const addTask = (title: string, toDoListId: string) => {
        ///////////// reducer
        const action = addTaskAC(title, toDoListId)
        dispatchToTasks(action)
    }

    const changeTasksStatus = (taskId: string, newIsDone: boolean, toDoListId: string) => {
        ///////////// reducer
        const action = changeTaskStatusAC(toDoListId, taskId, newIsDone)
        dispatchToTasks(action)
    }
    const changeTasksTitle = (taskId: string, newTitle: string, toDoListId: string) => {
        ///////////// reducer
        const action = changeTaskTitleAC(toDoListId, taskId, newTitle)
        dispatchToTasks(action)
    }

    const changeTodoListTitle = (newTitle: string, toDoListId: string) => {
        ///////////// reducer
        const action = ChangeTodoListTitleAC(toDoListId, newTitle)
        dispatchToDoList(action)
    }
    const addTodoList = (title: string) => {
        ///////////// reducer
        const action = AddTodoListAC(title)
        dispatchToDoList(action)
        dispatchToTasks(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, toDoListId: string) => {
        ///////////// reducer
        const action = ChangeTodoListFilterAC(toDoListId, filter)
        dispatchToDoList(action)
    }


    const removeToDoList = (toDoListId: string) => {
        ///////////// reducer
        const action = RemoveTodolistAC(toDoListId)
        dispatchToDoList(action)
        dispatchToTasks(action)
    }

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "Active":
                return tasksList.filter(t => t.isDone === false)
            case "Completed":
                return tasksList.filter(t => t.isDone === true)
            default:
                return tasksList
        }
    }

    const toDoListComponents = toDoList.map(tl => {
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper elevation={3}>
                    <TodoList
                        key={tl.id}
                        toDoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        filter={tl.filter}
                        addTask={addTask}
                        changeTasksStatus={changeTasksStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        removeToDoList={removeToDoList}
                        changeTasksTitle={changeTasksTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    const mode = isDarkMode ? "dark" : "light"
    const customTheme = createTheme({
        palette: {
            primary: lightGreen,
            secondary: lightBlue,
            mode: mode
        }
    })


    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position={"static"}>
                    <Toolbar>
                        <IconButton
                            size={"large"}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked={true} onChange={(e) =>
                                setIsDarkMode(e.currentTarget.checked)}/>}
                                              label={isDarkMode ? "Go to Light" : "Go to Dark"}
                            />
                        </FormGroup>
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: "15px 0px"}}>
                        <AddItemForm addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {toDoListComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithReducers;

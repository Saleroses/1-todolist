import React from 'react';
import './App.css';
import TodoList from "./TodoList";



export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App(): JSX.Element {
    const tasks: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
    ]
    return (


        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks}/>
            <TodoList title={"What to buy"} tasks={tasks}/>
            <TodoList title={"What to read"} tasks={tasks}/>

        </div>
    );
}

export default App;

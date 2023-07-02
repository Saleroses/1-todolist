import {v1} from "uuid";
import {toDoListType} from "../App";
import {todoListsReducer} from "./todoLists-reducer";


let startState: Array<toDoListType>
let todoListId1: string
let todoListId2: string

beforeEach( ()=> {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ]
})


test("correct todolist should be removed", () => {


    const endState = todoListsReducer(startState, {type: "REMOVE-TODOLIST", id: todoListId1})


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
});

test("correct todolist should be added", () => {

    let newTodoListTitle = "New TodoList"
    const endState = todoListsReducer(startState, {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()})


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
});

test("correct todolist change title", () => {

    let newTodoListTitle = "New TodoList"
    const endState = todoListsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", title: newTodoListTitle, id: todoListId2})


    expect(endState[0].title).toBe("What to learn")
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodoListTitle)
});

test("correct todolist change filter", () => {

    let newTodoListFilter = "Active";
    const endState = todoListsReducer(startState, {type: "CHANGE-TODOLIST-FILTER", filter: "Active", id: todoListId2})

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe("Active")
    expect(endState.length).toBe(2)

});
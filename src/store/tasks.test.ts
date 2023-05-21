import {ActionType, div, mult, SalaryReducer, StateType, sub, sum} from "./tasks";
import {type} from "os";

test("sum", ()=>{
    //Данные для теста
    const salary: number = 800
    const n: number = 200
    //Выполнение кода
    const result = sum(salary, n)
    //Проверка результата
    expect(result).toBe(1000)
})

test("sub", ()=>{
    expect(sub(1200, 200)).toBe(1000)
})

test("div", ()=>{
    expect(div(1200, 80)).toBe(15)
})

test("multiply", ()=>{
    expect(mult(1200, 75)).toBe(90000)
    expect(mult(1200, 0)).toBe(0)
    expect(mult(0, 75)).toBe(0)
})

test("case sum of state", ()=>{
    const salary: StateType = 800


    expect(SalaryReducer(salary, {type: "SUM", n: 100})).toBe(900)
    expect(SalaryReducer(salary, {type: "SUB", n: 200})).toBe(600)
    expect(SalaryReducer(salary, {type: "DIV", n: 2})).toBe(400)
    expect(SalaryReducer(salary, {type: "MULT", n: 10})).toBe(8000)
    expect(SalaryReducer(salary, {type: "MULT", n: 0})).toBe(0)
    expect(SalaryReducer(salary, {type: "TEST", n: 345})).toBe(salary)

})


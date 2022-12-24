import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

const initialState:TasksStateType = {}

export const TasksReducer = (state= initialState, action: TasksActionTypes):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK" :
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(el => el.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.newIsDone} : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]:[] }
        case 'REMOVE-TODOLIST' :
           let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return  copyState
        default:
            return state
    }
}


export type TasksActionTypes = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, newIsDone, todolistId}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, title, todolistId}} as const
}


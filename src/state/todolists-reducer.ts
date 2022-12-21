import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export const TodolistsReducer = (state: Array<TodolistType>, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(el => el.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.id ?{...el,title:action.payload.title} : el)
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.id ? {...el,filter:action.payload.filter}:el)
        default :
            return state
    }

}


type ActionTypes = removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId: todolistId}} as const
}
export const addTodolistAC = (title: string,todolistId:string) => {
    return {type: "ADD-TODOLIST", payload: {title,todolistId:v1() }} as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {id: todolistID, title: newTitle}} as const
}
export const changeTodolistFilterAC = (todolistID: string,newFilter:FilterValuesType) => {
    return {type: "CHANGE-FILTER", payload:{id:todolistID,filter:newFilter }}as const
}
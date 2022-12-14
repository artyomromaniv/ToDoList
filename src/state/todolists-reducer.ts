import {TodolistType} from "../App";
import {typeOptions} from "@testing-library/user-event/utility/type";
import {v1} from "uuid";


export const TodolistsReducer = (state: Array<TodolistType>, action :ActionTypes) => {
        switch (action.type) {
            case 'REMOVE-TODOLIST' :
                return state.filter(el => el.id !== action.payload.todolistId)
            case "ADD-TODOLIST":
                 let newTodolistId = v1();
                 let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
                return [...state,newTodolist]
            default :
                return state
        }

}


type ActionTypes = removeTodolistACType | addTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType =ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (todolistId:string) => {
    return {type: 'REMOVE-TODOLIST',payload: {todolistId: todolistId} } as const
}
export const addTodolistAC = (title:string) => {
    return {type: "ADD-TODOLIST", payload:{title}} as const
}
import { TasksStateType} from "../App";
import {v1} from "uuid";


export const TasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case "REMOVE-TASK" :
            return {...state,[action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)}
        case "ADD-TASK":
             let newTask = {id: v1(), title: action.payload.title, isDone: false};
            // setTasks({...tasks, [todolistId]: [newTask,...tasks[todolistId]]})
            return {...state, [action.payload.todolistId] : [newTask,...state[action.payload.todolistId]]}
        default :
            return state
    }

}


type ActionTypes = removeTaskACType | addTaskACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>

export const removeTaskAC = (taskId: string,todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId,todolistId}} as const
}
export const addTaskAC = (title: string,todolistId: string) => {
    return {type: 'ADD-TASK', payload:{title,todolistId}} as const
}

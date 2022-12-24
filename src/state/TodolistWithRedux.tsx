import React, {ChangeEvent} from 'react';
import {TodolistType} from "../AppWithRedux";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "../AddItemForm";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../Todolist";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./task-reducer";

type TodolistWithReduxPropsType = {
    todolist:TodolistType
}

export const TodolistWithRedux = ({todolist}:TodolistWithReduxPropsType) => {
    const {id,title,filter} = todolist
    let tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const dispatch = useDispatch()

    const changeTodolistTitle = ( newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(title,id))
    }


    //для всех кнопок фильтров
    //const onFilterClickHandler = (filter:FilterValuesType)=> dispatch((changeTodolistFilterAC(id, filter)))

    const onAllClickHandler = ()=> dispatch((changeTodolistFilterAC(id, 'all')))
    const onActiveClickHandler = ()=> dispatch((changeTodolistFilterAC(id, 'active')))
    const onCompletedClickHandler = ()=> dispatch((changeTodolistFilterAC(id, 'completed')))

    return (
        <div>
            <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks.map(t => {
                        const onClickHandler = () =>  dispatch(removeTaskAC(t.id, id))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDone = e.currentTarget.checked;
                            dispatch(changeTaskStatusAC(t.id, newIsDone, id))
                        }
                        const onTitleChangeHandler = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(t.id, newTitle, id))
                        }


                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                color="success"
                                onChange={onChangeHandler}
                            />

                            <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                            <IconButton size="small" onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
};

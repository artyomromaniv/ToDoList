import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionTypes,
    TasksReducer
} from "./state/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    TodolistsActionTypes,
    TodolistsReducer
} from "./state/todolists-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithReducer = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer<Reducer<Array<TodolistType>, TodolistsActionTypes>>(TodolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(TasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    const removeTask = (id: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(id,todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchTasks(addTaskAC(title,todolistId))
    }

    const changeTaskStatus =(id: string, newIsDone: boolean, todolistId: string) => {
        dispatchTasks(changeTaskStatusAC(id,newIsDone,todolistId))
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchTasks(changeTaskTitleAC(id,newTitle,todolistId))
    }

    const changeTodolistFilter = (newValue: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId,newValue))
    }

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) =>  {
        dispatchTodolists(changeTodolistTitleAC(todolistID,newTitle))
    }

    const addTodolist = (title: string) => {
       let action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}



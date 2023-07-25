import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type changeTaskType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleType=ReturnType<typeof changeTaskTitleAC>

type ActionsType = removeTaskType | any | addTaskType | changeTaskType | changeTaskTitleType |AddTodolistActionType |RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }

        case "ADD-TASK":
            return {
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => (t.id === action.taskId)?{...t,isDone:action.payload.isDone}
                    :t)
            }

        case "CHANGE-TASK-TITLE":
            return{
                ...state,
                [action.payload.todolistId]:
            state[action.payload.todolistId].map(t=>t.id===action.taskId?
            {...t,title:action.title}:
        t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]:[]
            }



        default :
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", todolistId, taskId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", payload: {todolistId, title} as const}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS", payload: {
            taskId, isDone, todolistId} as const}
}

export const changeTaskTitleAC=(taskId: string, title:string, todolistId: string)=>{
    return{
        type:"CHANGE-TASK-TITLE",
        payload:{taskId,todolistId,title}
    }
}


import { AppRootStateType } from "app/store";

export const selectorTodolist=(state:AppRootStateType)=>state.todolists
export const selectorTasks=(state:AppRootStateType)=>state.tasks.tasks
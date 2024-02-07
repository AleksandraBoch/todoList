import { todolistsAPI, TodolistType } from "api/todolists-api";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "utils/error-utils";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: Array<TodolistDomainType> = [];

const slice=createSlice({
  name:'todoList',
  initialState:[] as TodolistDomainType[] ,
  reducers:{
    removeTodolist:(state,action:PayloadAction<{id: string}>)=>{
     // state.filter((tl) => tl.id != action.payload.id)
      const index=state.findIndex(tl=>tl.id===action.payload.id)
      if (index!=-1) state.splice(index,1)
    },
    setTodolists:(state,action:PayloadAction<{todolists: Array<TodolistType>}>)=>{
     return  action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" })
      )
    },
    addTodolist:(state,action:PayloadAction<{todolist: TodolistType}>)=>{
      const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
      state.unshift(newTodolist)
    },
    changeTodolistTitle:(state,action:PayloadAction<{id: string, title: string}>)=>{
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilter:(state,action:PayloadAction<{id: string, filter: FilterValuesType}>)=>{
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus:(state,action:PayloadAction<{id: string, status: RequestStatusType}>)=>{
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },

  }
})

export const todolistReducer=slice.reducer
export const todolistActions=slice.actions




// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistActions.setTodolists({todolists:res.data}));
        dispatch(appActions.setAppStatus({status:"succeeded"}));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string) :AppThunk=> {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({status:"loading"}));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistActions.changeTodolistEntityStatus({ id:todolistId,status: "loading" }));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistActions.removeTodolist({id:todolistId}));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({status:"succeeded"}));
    });
  };
};
export const addTodolistTC = (title: string):AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistActions.addTodolist({todolist:res.data.data.item}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string):AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistActions.changeTodolistTitle({id, title}));
    });
  };
};


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};


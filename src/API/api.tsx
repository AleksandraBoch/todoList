import React, {useEffect, useState} from 'react'
import axios from "axios";

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}


const instance=axios.create({
    baseURL:'https://https://social-network.samuraijs.com/api/1.1',
    withCredentials:true,
    headers:{
        'API-KEY':'04179916-1cd9-4a8d-bea3-202ee52f7094'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<UpdateTodolistResponseType>(
            `/todo-lists/${todolistId}`,
            { title: title },

        )
        return promise
    },
    DeleteTodolist(todolistId: string){
        const promise = instance.delete<DeleteTodolistResponseType>(`/todo-lists/${todolistId}`,)
        return promise
    },
    CreateTodolist(){
        const promise = instance.post<CreateTodolistResponseType>('/todo-lists',
            {title:'newTDlist'})
        return promise
    },
    GetTodolists(){
        const promise = instance.get<TodolistType[]>('/todo-lists')
        return promise}
}
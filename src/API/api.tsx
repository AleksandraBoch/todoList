import React, {useEffect, useState} from 'react'
import axios from "axios";

const settings={
    withCredentials:true,
    headers:{
        'API-KEY':'04179916-1cd9-4a8d-bea3-202ee52f7094'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
            .then((res)=>{
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title:'newTDlist'},
            settings)


    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

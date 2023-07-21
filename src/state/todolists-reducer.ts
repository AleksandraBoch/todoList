import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTDType | AddTDType |ChangeTDfilterType| ChangeTDTitleType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return {
                ...state.filter(t => t.id !== action.id)
            }
        case 'ADD-TODOLIST':
            return [
                ...state,
                {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            const newTd = state.find(t => t.id === action.id)
            if (newTd) {
                newTd.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter}
            return [...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}

type RemoveTDType = {
    type: 'REMOVE-TODOLIST' ,
    id:string
}
type AddTDType={
    type:'ADD-TODOLIST',
    title:string,
}
type ChangeTDTitleType ={
    type:'CHANGE-TODOLIST-TITLE',
    title:string,
    id:string

}
type ChangeTDfilterType={
    type:'CHANGE-TODOLIST-FILTER',
    filter:FilterValuesType,
    id:string
}
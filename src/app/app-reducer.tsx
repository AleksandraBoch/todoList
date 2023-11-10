
import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../auth/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionsType = setStatusType | SetErrorType |SetIsInitialized

export type setStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetIsInitialized= ReturnType<typeof isInitializedAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized:false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/INITIALIZED':
            return {...state,isInitialized:action.isInitialized}
        default:
            return state
    }
}

export const isInitializedAC=(isInitialized:boolean)=>(
    {type:'APP/INITIALIZED', isInitialized} as const)



export const setStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status}) as const

export const setErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const)




export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}
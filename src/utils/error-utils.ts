import {
    ActionsType,
    setErrorAC, SetErrorType,
    setStatusAC, setStatusType,
} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>,dispatch: ErrorUtilsDispatchType, ) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch,error: { message: string }, ) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC('failed'))
}


type ErrorUtilsDispatchType = Dispatch<SetErrorType | setStatusType>
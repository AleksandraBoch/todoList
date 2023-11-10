import {Dispatch} from 'redux'
import {isInitializedAC, SetErrorType, SetIsInitialized, setStatusAC, setStatusType} from "../app/app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        await authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    } catch (e) {

    }
    dispatch(setStatusAC('succeeded'))
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))

    try {
        authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch,)
            }
        })
    } catch (e) {
    } finally {
        dispatch(isInitializedAC(true))
    }
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(() => {
            // handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setStatusType | SetErrorType | SetIsInitialized

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionsType = setStatusType | SetErrorType

export type setStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status}) as const

export const setErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const)





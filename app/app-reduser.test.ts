import {appReducer, InitialStateType, setErrorAC} from "./app-reducer";

let startState:InitialStateType
test ('correct error message should be added',()=>{
    const endState=appReducer(startState,setErrorAC('some error'))
    expect(endState.error).toBe('some error')
})
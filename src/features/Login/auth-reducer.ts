import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI, LoginParamsType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { AppThunk } from "app/store";
import { appActions, appReducer } from "app/app-reducer";

// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
  // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    // Объект payload. Типизация через PayloadAction
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      // логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})

// Создаем reducer с помощью slice
export const authReducer = slice.reducer;
// Action creator также достаем с помощью slice

// либо вот так. ❗Делаем так, в дальнейшем пригодиться
export const authActions = slice.actions

// // thunks
export const loginTC =
  (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
          dispatch(appActions.setAppStatus({status:"succeeded"}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const logoutTC = ():AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({status:"loading"}));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({isLoggedIn:false}));
        dispatch(appActions.setAppStatus({status:"succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

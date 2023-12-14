import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../components/loginForm/login";
import {initializeAppTC, logoutTC} from "../auth/auth-reducer";

import {AppDispatchType} from "../state/store";

import {CircularProgress, LinearProgress} from "@mui/material";
import ErrorPage from "../components/ErrorPage/ErrorPage";


//отрисовка этой компоненты
function App() {
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType>((state) => state.app.isInitialized)
    const dispatch = useDispatch<AppDispatchType>();
    const status = useSelector<AppRootStateType>((state) => state.app.status)
    //
    // useEffect(() => {
    //     if(!isLoggedIn){return }
    //     dispatch(fetchTodoListsTC)
    // }, [])

    useEffect(() =>
        dispatch(initializeAppTC()), [])

    const LogOut = () => {

        dispatch(logoutTC())
    }
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn ?  <Button color="inherit" onClick={LogOut}>Log Out</Button>: <></>}

                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/todoList'} element={<TodolistsList/>}/>


                    <Route path='/404' element={<ErrorPage/>}/>
                    <Route path={'*/'} element={<Navigate to='/404'/>}/>
                </Routes>


            </Container>
        </div>
    )
}

export default App

//
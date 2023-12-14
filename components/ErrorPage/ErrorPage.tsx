import React from 'react';
import style from './ErrorPage.module.css'
const ErrorPage = () => {
    return (
        <div>
            <h1 className={style.title}> 404: Page is not found</h1>
            <div className={style.photo}></div>
        </div>
    );
};

export default ErrorPage;
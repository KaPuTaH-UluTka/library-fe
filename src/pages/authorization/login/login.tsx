import React from 'react';
import {Link} from 'react-router-dom';

import {AppPaths} from '../../../types/constants/constants';

import classes from './login.module.scss';

export const Login = () => {
    console.log('login')

    return (
        <div className={classes.loginWrapper}>
            <div className={classes.login}>
                <h2 className={classes.loginTitle}>Вход в личный кабинет</h2>
                <form className={classes.loginForm}>
                    <Link className={classes.forgotLink} to={AppPaths.forgotPass}>Забыли логин или пароль?</Link>
                    <button type="submit" className={classes.submitBtn}>Войти</button>
                </form>
                <p className={classes.accountNotExist}>Нет учётной записи?<Link className={classes.registrationLink} to={AppPaths.registration}>Регистрация</Link></p>
            </div>
        </div>
    );
};

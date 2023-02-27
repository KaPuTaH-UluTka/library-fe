import React from 'react';
import {Link} from 'react-router-dom';

import classes from './login.module.scss';

export const Login = () => {
    console.log('login')

    return (
        <div>
            <Link className={classes['login-registration-link']} to="/users/registration">Зарегистрироваться</Link>
        </div>
    );
};

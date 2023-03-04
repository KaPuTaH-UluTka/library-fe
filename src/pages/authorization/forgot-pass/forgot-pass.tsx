import React from 'react';
import {Link} from 'react-router-dom';

import classes from './forgot-pass.module.scss';

export const ForgotPass = () => {
    console.log('forgot')

    return (
        <div>
            <Link className={classes['login-registration-link']} to="/users/registration">Зарегистрироваться</Link>
        </div>
    );
};

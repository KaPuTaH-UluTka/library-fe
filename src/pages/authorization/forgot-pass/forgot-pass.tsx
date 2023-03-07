import React from 'react';
import {Link} from 'react-router-dom';

import {AppPaths} from '../../../types/constants/constants';

import classes from './forgot-pass.module.scss';

export const ForgotPass = () => {
    console.log('forgot')

    return (
        <div className={classes.forgotWrapper}>
            <div className={classes.forgot}>
                <Link className={classes.registrationLink}
                      to={AppPaths.registration}>Регистрация</Link>
            </div>
        </div>
    );
};

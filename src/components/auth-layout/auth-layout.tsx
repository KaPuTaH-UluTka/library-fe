import React from 'react';

import classes from './auth-layout.module.scss';


export const AuthLayout = ({ children }: { children: JSX.Element }) => (
    <div className={classes['auth-wrapper']}>
        <h1 className={classes['auth-title']}>Cleverland</h1>
        <div className={classes.auth}>
            { children }
        </div>
    </div>
);

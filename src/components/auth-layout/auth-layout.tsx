import React from 'react';

import classes from './auth-layout.module.scss';


export const AuthLayout = ({ children }: { children: JSX.Element }) => (
    <div className={classes.authWrapper}>
        <h1 className={classes.authTitle}>Cleverland</h1>
            { children }
    </div>
);

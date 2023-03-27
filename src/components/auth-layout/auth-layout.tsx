import React from 'react';
import {Navigate} from 'react-router-dom';

import {DataTestId} from '../../types/constants/data-test-id';
import {AppPaths} from '../../types/constants/paths';

import classes from './auth-layout.module.scss';


export const AuthLayout = ({ children }: { children: JSX.Element }) => {

    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to={AppPaths.booksAll} />;
    }

    return(
    <div className={classes.authWrapper}  data-test-id={DataTestId.Auth}>
        <h1 className={classes.authTitle}>Cleverland</h1>
            { children }
    </div>
)};

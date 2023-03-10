import React from 'react';
import {Navigate} from 'react-router-dom';

import {useAppSelector} from '../../hooks/redux';
import {AppPaths, DataTestId} from '../../types/constants/constants';

import classes from './auth-layout.module.scss';


export const AuthLayout = ({ children }: { children: JSX.Element }) => {

    const {token} = useAppSelector(state => state.userReducer);

    if (token) {
        return <Navigate to={AppPaths.booksAll} />;
    }

    return(
    <div className={classes.authWrapper}  data-test-id={DataTestId.Auth}>
        <h1 className={classes.authTitle}>Cleverland</h1>
            { children }
    </div>
)};

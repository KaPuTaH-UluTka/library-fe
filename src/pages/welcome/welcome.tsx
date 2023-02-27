import React from 'react';
import {Outlet} from 'react-router-dom';

import classes from './welcome.module.scss';


export const Welcome = () => (
        <div className={classes['welcome-wrapper']}>
            <h1 className={classes['welcome-title']}>Cleverland</h1>
            <div className={classes.welcome}>
                <Outlet />
            </div>
        </div>
    );

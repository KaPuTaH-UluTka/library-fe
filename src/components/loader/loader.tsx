import React from 'react';

import classes from './loader.module.scss';

import loaderIcon from '../../assets/loader-icon/loadIcon.svg';

export const Loader = () => (
        <div className={classes.loader} data-test-id='loader'>
            <img src={loaderIcon} alt="loader-icon"/>
        </div>
    );

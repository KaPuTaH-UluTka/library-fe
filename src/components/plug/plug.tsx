import React from 'react';
import classNames from 'classnames';

import classes from './plug.module.scss'

interface PlugProps {
    error?: boolean;
    title: string;
    description?: string;
}

export const Plug = ({error, title, description}: PlugProps) => (
        <div className={classNames(classes.plug,{[classes.plugError]: error})}>
            <h2 className={classes.plugTitle}>{title}</h2>
            {description && <p className={classes.plugDescription}>{description}</p>}
        </div>
    );

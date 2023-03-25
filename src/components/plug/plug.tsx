import React from 'react';
import classNames from 'classnames';

import classes from './plug.module.scss'

interface PlugProps {
    error?: boolean;
    title: string;
    description?: string;
    dataTestId: string;
}

export const Plug = ({error, title, description, dataTestId}: PlugProps) => (
        <div className={classNames(classes.plug,{[classes.plugError]: error})} data-test-id={dataTestId}>
            <h2 className={classes.plugTitle}>{title}</h2>
            {description && <p className={classes.plugDescription}>{description}</p>}
        </div>
    );

import React, {ReactNode} from 'react';

import classes from './modal-auth-layout.module.scss';


export const ModalAuthLayout = ({ children }: { children: ReactNode }) => (
    <div className={classes.ModalWrapper}>
            { children }
    </div>
);

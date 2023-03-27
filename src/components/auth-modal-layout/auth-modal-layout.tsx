import React, {ReactNode} from 'react';

import {DataTestId} from '../../types/constants/data-test-id';

import classes from './auth-modal-layout.module.scss';


export const AuthModalLayout = ({ children }: { children: ReactNode }) => (
    <div className={classes.ModalWrapper}  data-test-id={DataTestId.StatusBlock}>
            { children }
    </div>
);

import React, {ReactNode} from 'react';

import classes from './modal-auth-layout.module.scss';
import {DataTestId} from "../../types/constants/constants";


export const ModalAuthLayout = ({ children }: { children: ReactNode }) => (
    <div className={classes.ModalWrapper} data-test-id={DataTestId.Auth}>
            { children }
    </div>
);

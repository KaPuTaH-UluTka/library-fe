import React, {ReactNode} from 'react';

import {DataTestId} from '../../types/constants/constants';

import classes from './modal-auth-layout.module.scss';


export const ModalAuthLayout = ({ children }: { children: ReactNode }) => (
    <div className={classes.ModalWrapper}  data-test-id={DataTestId.StatusBlock}>
            { children }
    </div>
);

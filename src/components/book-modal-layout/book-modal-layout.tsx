import React from 'react';

import OrangeCloseImg from '../../assets/orange-close.svg';
import {DataTestId} from '../../types/constants/constants';

import classes from './book-modal-layout.module.scss';

interface BookModalLayoutProps {
    children: JSX.Element,
    clickEvent: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => void
    wrapperTestId: string
}

export const BookModalLayout = ({children, clickEvent, wrapperTestId}: BookModalLayoutProps) => (
    <div className={classes.modalShadow} onClick={(e) => clickEvent(e)} data-test-id={DataTestId.ModalOuter}>
        <div className={classes.modalWrapper} onClick={(e) => e.stopPropagation()} data-test-id={wrapperTestId}>
            <button type='button' className={classes.closeBtn} onClick={(e) => clickEvent(e)} data-test-id={DataTestId.ModalCloseButton}><img
                src={OrangeCloseImg} alt="close"/>
            </button>
            {children}
        </div>
    </div>
);

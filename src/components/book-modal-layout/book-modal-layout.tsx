import React from 'react';

import classes from './book-modal-layout.module.scss';
import OrangeCloseImg from '../../assets/orange-close.svg';

interface BookModalLayoutProps {
    children: JSX.Element,
    clickEvent: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => void
}

export const BookModalLayout = ({children, clickEvent}: BookModalLayoutProps) => (
    <div className={classes.modalShadow} onClick={(e) => clickEvent(e)}>
        <div className={classes.modalWrapper} onClick={(e) => e.stopPropagation()}>
            <button type='button' className={classes.closeBtn} onClick={(e) => clickEvent(e)}><img
                src={OrangeCloseImg} alt="close"/>
            </button>
            {children}
        </div>
    </div>
);

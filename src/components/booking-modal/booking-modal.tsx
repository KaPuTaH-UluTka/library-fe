import React from 'react';

import {DataTestId} from '../../types/constants/constants';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';

import classes from './booking-modal.module.scss';

interface ReviewProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}


export const BookingModal = ({setIsModalOpen}:ReviewProps) => {

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }

    return (
        <BookModalLayout clickEvent={(e) => closeHandler(e)} wrapperTestId={DataTestId.BookingModal}>
        <div className={classes.bookingModal} onClick={(e)=> e.stopPropagation()}>
            booking
        </div></BookModalLayout>)
};

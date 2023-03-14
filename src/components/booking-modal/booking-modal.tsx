import React from 'react';



import classes from './booking-modal.module.scss';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';

interface ReviewProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
}


export const BookingModal = ({isModalOpen, setIsModalOpen}:ReviewProps) => {

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(!isModalOpen);
    }

    return (
        <BookModalLayout clickEvent={(e) => closeHandler(e)}>
        <div className={classes.bookingModal} onClick={(e)=> e.stopPropagation()}>
            booking
        </div></BookModalLayout>)
};

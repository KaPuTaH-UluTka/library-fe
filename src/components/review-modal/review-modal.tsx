import React from 'react';



import classes from './review-modal.module.scss';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';

interface ReviewProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
}


export const ReviewModal = ({isModalOpen, setIsModalOpen}:ReviewProps) => {

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(!isModalOpen);
    }

    return (
        <BookModalLayout clickEvent={(e) => closeHandler(e)}>
        <div className={classes.reviewModal} onClick={(e)=> e.stopPropagation()}>
            <div className={classes.title}>Оцените книгу</div>
            <p className={classes.text}>Ваша оценка</p>
            <div className={classes.score}>stars</div>
            <input className={classes.review} type="text"/>
            <button type='submit' className={classes.closeBtn}>Оценить</button>
        </div></BookModalLayout>)
};

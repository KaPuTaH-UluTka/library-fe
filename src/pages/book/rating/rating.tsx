import React from 'react';

import {BookRating} from '../../../components/book-rating/book-rating';
import {BookInterface} from '../../../types/book';

import classes from './rating.module.scss';

interface RatingProps {
    book: BookInterface
}

export const Rating = ({book}: RatingProps) => (
        <div className={classes.rating}>
            <h5 className={classes.ratingTitle}>Рейтинг</h5>
            <div className={classes.ratingInfo}>
                {book.rating ?
                    <BookRating rating={book.rating}/> :
                    <><BookRating rating={0}/>
                        <span
                            className={classes.emptyReviews}>еще нет оценок</span>
                    </>}
                {book.rating &&
                    <p className={classes.ratingNumber}>{book.rating}</p>}
            </div>
        </div>
    );

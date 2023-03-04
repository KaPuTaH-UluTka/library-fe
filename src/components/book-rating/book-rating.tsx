import React from 'react';

import starIcon from '../../assets/rating-icons/Icon_star.svg';
import filledStarIcon from '../../assets/rating-icons/Icon_star_filled.svg';

import classes from './book-rating.module.scss';

export const BookRating = (props: { rating: number }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={classes['book-rating']}>
            {stars.map(star => props.rating < star ?
                <img src={starIcon} alt='rating-empty'/>
                :
                <img src={filledStarIcon} alt='rating'/>)}
        </div>)
};

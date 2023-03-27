import React from 'react';

import starIcon from '../../assets/rating-icons/Icon_star.svg';
import filledStarIcon from '../../assets/rating-icons/Icon_star_filled.svg';

import classes from './book-rating.module.scss';

interface BookRatingProps {
    rating: number,
    wrapperTestId?: string,

    filledStarTestId?: string,

    emptyStarTestId?: string,
}

export const BookRating = ({
                               rating,
                               wrapperTestId,
                               emptyStarTestId,
                               filledStarTestId
                           }: BookRatingProps) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={classes.bookRating} data-test-id={wrapperTestId}>
            {stars.map(value =>
                <label key={value} data-test-id={emptyStarTestId}>{
                    rating < value ?
                        <img src={starIcon} alt='empty-star'/>
                        :
                        <img src={filledStarIcon} alt='star'
                             data-test-id={filledStarTestId}/>}
                </label>)}
        </div>)
};

import React from 'react';

import starIcon from '../../assets/rating-icons/Icon_star.svg';
import filledStarIcon from '../../assets/rating-icons/Icon_star_filled.svg';

import classes from './book-rating.module.scss';

export const BookRating = (props: { rating: number }) => {
    const filledStars = Array.from(Array(Math.trunc(props.rating)));
    const emptyStars = Array.from(Array(Math.round(5 - props.rating)));

    return(
    <div className={classes['book-rating']}>
        {filledStars.map((el,i)=> <img key={i}
            src={filledStarIcon}
            alt="filled-star" />)}
        {emptyStars.map((el, i)=> <img key={i}
            src={starIcon}
            alt="star" />)}
    </div>)};

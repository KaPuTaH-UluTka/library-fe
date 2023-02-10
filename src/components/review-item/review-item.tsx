import React from 'react';

import reviewAvatar from '../../assets/review_avatar.svg';
import {Review} from '../../types/book';
import {BookRating} from '../book-rating/book-rating';

import classes from './review-item.module.scss';

export const ReviewItem = ({review}: { review: Review }) => {

    const correctDate = () => {
        const months=[
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'ноября',
            'декабря',
        ];
        const reviewDate = review.date.split('.');

        const day = reviewDate[0][0] === '0' ? reviewDate[0].slice(1) : reviewDate[0]

        const month = reviewDate[1][0] === '0' ? months[+reviewDate[1].slice(1) - 1] : months[+reviewDate[1] -1]

        const year = reviewDate[2];

        return `${day} ${month} ${year}`
    }

    return(
    <div className={classes['review-item-wrapper']}>
        <div className={classes['review-item']}>
            <div className={classes['review-item-header']}><img
                className={classes['review-item-avatar']} src={reviewAvatar} alt="review-avatar"/>
                <p className={classes['review-item-info']}>{review.userName}
                    <span>{correctDate()}</span></p>
            </div>
            {review.rating && <BookRating rating={review.rating}/>}
            {review.feedback &&
                <p className={classes['review-item-feedback']}>{review.feedback}</p>}
        </div>
    </div>)};

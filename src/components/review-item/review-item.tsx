import React from 'react';

import reviewAvatar from '../../assets/review_avatar.svg';
import {CommentInterface} from '../../types/book';
import {API_URL} from '../../utils/constants';
import {BookRating} from '../book-rating/book-rating';

import classes from './review-item.module.scss';

export const ReviewItem = ({comment}: { comment: CommentInterface }) => {

    const commentDate = new Date(comment.createdAt);

    return (
        <div className={classes['review-item-wrapper']}>
            <div className={classes['review-item']}>
                <div className={classes['review-item-header']}><img
                    className={classes['review-item-avatar']}
                    src={comment.user.avatarUrl ? API_URL + comment.user.avatarUrl : reviewAvatar}
                    alt="review-avatar"/>
                    <p className={classes['review-item-info']}>{`${comment.user.firstName} ${comment.user.lastName}`}
                        <span>{commentDate.toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }).slice(0, -3)}</span></p>
                </div>
                {comment.rating && <BookRating rating={comment.rating}/>}
                {comment.text &&
                    <p className={classes['review-item-feedback']}>{comment.text}</p>}
            </div>
        </div>)
};

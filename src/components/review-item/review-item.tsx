import React from 'react';

import reviewAvatar from '../../assets/review_avatar.svg';
import {API_URL} from '../../store/api/api-url';
import {CommentInterface} from '../../types/book';
import {DataTestId} from '../../types/constants/constants';
import {BookRating} from '../book-rating/book-rating';

import classes from './review-item.module.scss';

export const ReviewItem = ({comment}: { comment: CommentInterface }) => {

    const commentDate = new Date(comment.createdAt);

    return (
        <div className={classes.reviewItemWrapper} data-test-id={DataTestId.CommentWrapper}>
            <div className={classes.reviewItem}>
                <div className={classes.reviewItemHeader}><img
                    className={classes.reviewItemAvatar}
                    src={comment.user.avatarUrl ? API_URL + comment.user.avatarUrl : reviewAvatar}
                    alt="review-avatar"/>
                    <p className={classes.reviewItemInfo}><span data-test-id={DataTestId.CommentAuthor}>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
                        <span data-test-id={DataTestId.CommentDate}>{commentDate.toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }).slice(0, -3)}</span></p>
                </div>
                {comment.rating && <BookRating rating={comment.rating} wrapperTestId={DataTestId.Rating} emptyStarTestId={DataTestId.Star} filledStarTestId={DataTestId.StarActive}/>}
                {comment.text &&
                    <p className={classes.reviewItemFeedback} data-test-id={DataTestId.CommentText}>{comment.text}</p>}
            </div>
        </div>)
};

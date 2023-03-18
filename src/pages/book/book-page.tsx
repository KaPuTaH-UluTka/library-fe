import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames';

import BlackChevron from '../../assets/black-chevron.svg';
import noImageBook from '../../assets/defaultBook.png';
import {BookDetails} from '../../components/book-details/book-details';
import {BookLink} from '../../components/book-link/book-link';
import {BookRating} from '../../components/book-rating/book-rating';
import {BookingModal} from '../../components/booking-modal/booking-modal';
import {ReviewItem} from '../../components/review-item/review-item';
import {ReviewModal} from '../../components/review-modal/review-modal';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {API_URL} from '../../store/api/api-url';
import {libraryApi} from '../../store/api/library-api';
import {
    setBaseResponseErrorTrue, setFetchingFalse, setFetchingTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {DataTestId} from '../../types/constants/constants';
import {bookingBtnText} from '../../utils/booking-btn';
import {commentExistChecker} from '../../utils/comment-exist-checker';

import {Slider} from './slider/slider';

import classes from './book-page.module.scss';
import { CommentInterface } from '../../types/book';

export const BookPage = () => {

    const {bookId} = useParams();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const {data: book, isError, isFetching} = libraryApi.useGetBookByIdQuery(bookId || '0');

    const [isReviewsOpen, setReviewsState] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const body = document.querySelector('body') as HTMLElement;

    const isBookedByUser = book?.booking?.customerId === user?.id;

    const copiedComments: CommentInterface[] = [];

    book?.comments?.forEach(el => copiedComments.push(el));

    const sortedComments = copiedComments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    useEffect(() => {
        if (isError) {
            dispatch(setBaseResponseErrorTrue());
        }
        if (isReviewModalOpen || isBookingModalOpen) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
        if (isFetching) {
            dispatch(setLoadingTrue());
            dispatch(setFetchingTrue());
        } else {
            dispatch(setLoadingFalse());
            dispatch(setFetchingFalse());
        }
    }, [body.classList, dispatch, isBookingModalOpen, isError, isFetching, isReviewModalOpen]);

    return <section className={classes.bookPage}>
        <div className={classes.bookPageWrapper}>
            <BookLink bookTitle={book?.title}/>
            {book && <div className={classes.info}>
                <div className={classes.book}>
                    {book.images && book.images.length > 1 ? <Slider images={book.images}/> :
                        <img className={classes.bookImg}
                             src={book.images ? API_URL + book.images[0].url : noImageBook}
                             alt={book.title}/>}
                    <div className={classes.about}>
                        <h2 className={classes.title}
                            data-test-id={DataTestId.BookTitle}>{book.title}</h2>
                        <div
                            className={classes.author}>{`
                            ${book.authors.map(el => el)}
                            ${book.issueYear}`}</div>
                        <button className={classNames(classes.btn, {[classes.btnBooked]: isBookedByUser})} type="button"
                                disabled={!!book.delivery?.dateHandedTo || (book.booking !== null && book.booking.customerId !== user?.id)}
                                data-test-id={DataTestId.BookingButton}
                                onClick={() => setIsBookingModalOpen(!isBookingModalOpen)}>
                            {bookingBtnText(book)}
                        </button>
                        <h5 className={classes.aboutBookTitle}>О книге</h5>
                        <p className={classes.aboutBookDescription}>{book.description}</p>
                    </div>
                </div>
                <div className={classes.rating}>
                    <h5 className={classes.ratingTitle}>Рейтинг</h5>
                    <div className={classes.ratingInfo}>
                        {book.rating ?
                            <BookRating rating={book.rating} wrapperTestId="" emptyStarTestId=''
                                        filledStarTestId=''/> :
                            <><BookRating wrapperTestId="" emptyStarTestId='' filledStarTestId=''
                                          rating={0}/>
                                <span
                                    className={classes.emptyReviews}>еще нет оценок</span>
                            </>}
                        {book.rating &&
                            <p className={classes.ratingNumber}>{book.rating}</p>}
                    </div>
                </div>
                <BookDetails book={book}/>
                <div className={classes.reviews}>
                    <h5 className={classes.reviewsTitle}>Отзывы<span>{book.comments ? book.comments.length : 0}</span>
                    </h5>
                    <button
                        className={isReviewsOpen ? classes.reviewsToggleActive : classes.reviewsToggle}
                        onClick={() => isReviewsOpen ? setReviewsState(false) : setReviewsState(true)}
                        data-test-id={DataTestId.ButtonHideReviews}
                        type="button"><img src={BlackChevron} alt="black-chevron"/></button>

                    <div
                        className={classNames(classes.reviewsList, {[classes.reviewsListHide]: isReviewsOpen})}
                        data-test-id={DataTestId.Reviews}>
                        {sortedComments.map((el) => <ReviewItem comment={el}
                                                                                key={el.id}/>)}
                    </div>
                    <button className={classes.btn} type="button"
                            data-test-id={DataTestId.ButtonRateBook}
                            onClick={() => setIsReviewModalOpen(!isReviewModalOpen)}
                            disabled={book.comments && user ? commentExistChecker(book.comments, user.id) : false}>
                        Оценить книгу
                    </button>
                </div>
            </div>}
            {isReviewModalOpen && <ReviewModal setIsModalOpen={setIsReviewModalOpen}/>}
            {isBookingModalOpen && book &&
                <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </div>
    </section>
};

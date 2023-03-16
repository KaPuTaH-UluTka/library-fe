import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames';

import BlackChevron from '../../assets/black-chevron.svg';
import noImageBook from '../../assets/defaultBook.png';
import {BookDetails} from '../../components/book-details/book-details';
import {BookLink} from '../../components/book-link/book-link';
import {BookRating} from '../../components/book-rating/book-rating';
import {BookingModal} from '../../components/booking-modal/booking-modal';
import {Loader} from '../../components/loader/loader';
import {ReviewItem} from '../../components/review-item/review-item';
import {ReviewModal} from '../../components/review-modal/review-modal';
import {Toast} from '../../components/toast/toast';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {API_URL} from '../../store/api/api-url';
import {libraryApi} from '../../store/api/library-api';
import {setErrorTrue, setLoadingFalse, setLoadingTrue} from '../../store/reducers/request-status-reducer';
import {DataTestId, ToastMessages} from '../../types/constants/constants';
import {commentExistChecker} from '../../utils/comment-exist-checker';
import {dateParser} from '../../utils/date-parser';

import {Slider} from './slider/slider';

import classes from './book-page.module.scss';

export const BookPage = () => {

    const {bookId} = useParams();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const {data: book, isError, isLoading} = libraryApi.useGetBookByIdQuery(bookId || '0');

    const [isReviewsOpen, setReviewsState] = useState(false);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const body = document.querySelector('body') as HTMLElement;

    useEffect(() => {
        if (isError) {
            dispatch(setErrorTrue());
        }
        if (isReviewModalOpen || isBookingModalOpen) {
            body.classList.add('no-scroll');
        }
        if(isLoading){
            dispatch(setLoadingTrue())
        } else {
            dispatch(setLoadingFalse())
            body.classList.remove('no-scroll');
        }
    },[body.classList, dispatch, isBookingModalOpen, isError, isLoading, isReviewModalOpen])

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
                        <h2 className={classes.title} data-test-id={DataTestId.BookTitle}>{book.title}</h2>
                        <div
                            className={classes.author}>{`
                            ${book.authors.map(el => el)}
                            ${book.issueYear}`}</div>
                        <button className={classes.btn} type="button"
                                disabled={book.delivery && book.delivery.handed ? book.delivery.handed : false}
                                onClick={() => setIsBookingModalOpen(!isBookingModalOpen)}>
                            {book.delivery && book.delivery.handed && book.delivery.dateHandedTo ? `Занята до ${dateParser(book.delivery.dateHandedTo)}` : 'Забронировать'}
                        </button>
                        <h5 className={classes.aboutBookTitle}>О книге</h5>
                        <p className={classes.aboutBookDescription}>{book.description}</p>
                    </div>
                </div>
                <div className={classes.rating}>
                    <h5 className={classes.ratingTitle}>Рейтинг</h5>
                    <div className={classes.ratingInfo}>
                        {book.rating ?
                            <BookRating rating={book.rating} wrapperTestId="" emptyStarTestId='' filledStarTestId=''/> :
                            <><BookRating wrapperTestId="" emptyStarTestId='' filledStarTestId='' rating={0}/>
                                <span
                                    className={classes.emptyReviews}>еще нет оценок</span>
                            </>}
                        {book.rating &&
                            <p className={classes.ratingNumber}>{book.rating}</p>}
                    </div>
                </div>
                <BookDetails book={book} />
                <div className={classes.reviews}>
                    <h5 className={classes.reviewsTitle}>Отзывы<span>{book.comments ? book.comments.length : 0}</span>
                    </h5>
                    <button
                        className={isReviewsOpen ? classes.reviewsToggleActive : classes.reviewsToggle}
                        onClick={() => isReviewsOpen ? setReviewsState(false) : setReviewsState(true)}
                        data-test-id={DataTestId.ButtonHideReviews}
                        type="button"><img src={BlackChevron} alt="black-chevron"/></button>

                    <div className={classNames(classes.reviewsList, {[classes.reviewsListHide] : isReviewsOpen})} data-test-id={DataTestId.Reviews}>
                        {book.comments && book.comments.map((el) => <ReviewItem comment={el}
                                                                                key={el.id}/>)}
                    </div>
                    <button className={classes.btn} type="button"
                            data-test-id={DataTestId.ButtonRateBook} onClick={() => setIsReviewModalOpen(!isReviewModalOpen)} disabled={book.comments && user ? commentExistChecker(book.comments, user.id) : false}>
                        Оценить книгу
                    </button>
                </div>
            </div>}
            {isReviewModalOpen && <ReviewModal  setIsModalOpen={setIsReviewModalOpen}/>}
            {isBookingModalOpen && <BookingModal setIsModalOpen={setIsBookingModalOpen}/>}
        </div>
    </section>
};

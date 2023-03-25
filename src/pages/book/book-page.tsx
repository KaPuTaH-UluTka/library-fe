import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {skipToken} from '@reduxjs/toolkit/query/react';
import classNames from 'classnames';

import BlackChevron from '../../assets/black-chevron.svg';
import noImageBook from '../../assets/defaultBook.png';
import {BookDetails} from '../../components/book-details/book-details';
import {BookLink} from '../../components/book-link/book-link';
import {BookRating} from '../../components/book-rating/book-rating';
import {BookingModal} from '../../components/booking-modal/booking-modal';
import {CustomButton} from '../../components/custom-elements/button/custom-button';
import {ReviewItem} from '../../components/review-item/review-item';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {API_URL} from '../../store/api/api-url';
import {libraryApi} from '../../store/api/library-api';
import {
    setBaseResponseErrorTrue,
    setFetchingFalse,
    setFetchingTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {setCurrentComment, setIsReviewModalTrue} from '../../store/reducers/review-modal-reducer';
import {BookInterface, CommentInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {DataTestId} from '../../types/constants/constants';
import {BtnType, BtnVariant, Size} from '../../types/custom-element';
import {bookingBtnText} from '../../utils/btn-text';
import {commentExist} from '../../utils/comment-exist';

import {Slider} from './slider/slider';

import classes from './book-page.module.scss';

export const BookPage = () => {

    const {bookId} = useParams();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const {
        data: bookData,
        isError,
        isFetching
    } = libraryApi.useGetBookByIdQuery(bookId || skipToken);

    const [isReviewsOpen, setReviewsState] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const [trigger] = libraryApi.useLazyGetBookByIdQuery();

    const body = document.querySelector('body') as HTMLElement;

    let book: BookCardInterface | BookInterface | null = null;

    if (bookData && !('length' in bookData)) {
        book = bookData;
    }
    if (bookData && ('length' in bookData) && bookId) {
        book = bookData[+bookId - 1];
    }

    const copiedComments: CommentInterface[] = [];

    book?.comments?.forEach((el: CommentInterface) => copiedComments.push(el));

    const sortedComments = copiedComments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    const openReviewModalHandler = () => {
        if(book){
            trigger(book?.id.toString());
        }
        const userComment = user?.comments?.find((comment) => comment.bookId === book?.id);

        dispatch(setCurrentComment(userComment));
        dispatch(setIsReviewModalTrue());
    }

    useEffect(() => {
        if (isError) {
            dispatch(setBaseResponseErrorTrue());
        }
        if (isBookingModalOpen) {
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
    }, [body.classList, dispatch, isBookingModalOpen, isError, isFetching]);

    return <section className={classes.bookPage}>
        {book && <div className={classes.bookPageWrapper}>
            <BookLink bookTitle={book?.title}/>
            <div className={classes.info}>
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
                        <div className={classes.btnWrapper}>
                        <CustomButton type={BtnType.button} text={bookingBtnText(book)}
                                      dataTestId={DataTestId.BookingButton}
                                      clickHandler={() => setIsBookingModalOpen(true)}
                                      variant={book.booking === null && !book.delivery ? BtnVariant.primary : BtnVariant.secondary}
                                      size={Size.big}
                                      isDisabled={!!book.delivery?.dateHandedTo || (book.booking !== null && book.booking.customerId !== user?.id)}/>
                        </div>
                        <h5 className={classes.aboutBookTitle}>О книге</h5>
                        <p className={classes.aboutBookDescription}>{book.description}</p>
                    </div>
                </div>
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
                    <div className={classes.btnWrapper}>
                    <CustomButton type={BtnType.button} text={book.comments && user && commentExist(book.comments, user.id) ? 'Изменить оценку' : 'Оценить книгу'}
                                  dataTestId={DataTestId.ButtonRateBook}
                                  clickHandler={openReviewModalHandler}
                                  variant={book.comments && user && commentExist(book.comments, user.id) ? BtnVariant.secondary : BtnVariant.primary}
                                  size={Size.big}/>
                    </div>
                </div>
            </div>
            {isBookingModalOpen &&
                <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </div>}
    </section>
};

import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {BookingModal} from '../../../../components/booking-modal/booking-modal';
import {Highlight} from '../../../../components/search-hightlight/search-highlight';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {API_URL} from '../../../../store/api/api-url';
import {UserBook} from '../../../../types/book';
import {BookCardInterface} from '../../../../types/book-card';
import {DataTestId} from '../../../../types/constants/constants';
import {bookingBtnText} from '../../../../utils/booking-btn';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';
import {libraryApi} from '../../../../store/api/library-api';
import {
    setBookingCancelResponseErrorTrue,
    setBookingCancelResponseSuccessTrue, setLoadingFalse, setLoadingTrue
} from "../../../../store/reducers/request-status-reducer";

interface BookCardProps {
    book: BookCardInterface | UserBook,
    cardView: boolean,
    searchValue: string,
    bookingId?: number,
}

export const BookCard = ({book, cardView, searchValue, bookingId}: BookCardProps) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const {user} = useAppSelector(state => state.userReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);
    const booking = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookingModalOpen(!isBookingModalOpen);
    }
    const isBookedByUser = book && 'booking' in book ? book?.booking?.customerId === user?.id : null;
    const openBook = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/books/${currentCategory.path}/${book.id}`);

    }

    const light = useCallback((title: string) => searchValue ?
        <Highlight filter={searchValue} title={title}/> : title, [searchValue]);

    const cutTitle = (title: string) => title.length > 54 ? `${title.slice(0, 54)}...` : title;

    const [cancelBooking, {
        isLoading: cancelIsLoading,
        isError: cancelIsError,
        isSuccess: cancelIsSuccess
    }] = libraryApi.useCancelBookingMutation();

    const cancelBookingHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (bookingId) cancelBooking(bookingId.toString());
    }

    useEffect(() => {
        if (cancelIsSuccess && !isRequestFetching) {
            dispatch(setBookingCancelResponseSuccessTrue());
        }
        if (cancelIsError && !isRequestFetching) {
            dispatch(setBookingCancelResponseErrorTrue());
        }
        if (cancelIsLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    },[cancelIsError, cancelIsLoading, cancelIsSuccess, dispatch, isRequestFetching])

    return (<>
            <div role="button" tabIndex={0}
                 className={cardView ? classesWindow.card : classesList.card}
                 onClick={(e) => openBook(e)} data-test-id={DataTestId.Card}>
                {book && typeof book.image === 'string' &&
                    <img className={cardView ? classesWindow.cardImg : classesList.cardImg}
                         src={book.image ? API_URL + book.image : noImageBook}
                         alt={book.title}/>
                    }
                {book && typeof book.image !== 'string' && <img className={cardView ? classesWindow.cardImg : classesList.cardImg}
                      src={book.image ? API_URL + book.image.url : noImageBook}
                      alt={book.title}/>}
                <div
                    className={cardView ? classesWindow.cardRating : classesList.cardRating}>{book && book.rating ?
                    <BookRating rating={book.rating} wrapperTestId="" emptyStarTestId=''
                                filledStarTestId=''/> : 'еще нет оценок'}</div>
                <p className={cardView ? classesWindow.cardTitle : classesList.cardTitle}>{book && light(cutTitle(book.title))}</p>
                <span
                    className={cardView ? classesWindow.cardAuthor : classesList.cardAuthor}>{book && `${book.authors.map(el => el)}, ${book.issueYear}`}</span>
                {book && 'delivery' in book ? <button
                    className={cardView ? classNames(classesWindow.cardBtn, {[classesWindow.cardBtnBooked]: isBookedByUser}) : classNames(classesList.cardBtn, {[classesWindow.cardBtnBooked]: isBookedByUser})}
                    type="button"
                    data-test-id={DataTestId.BookingButton}
                    disabled={!!book.delivery?.dateHandedTo || (book.booking !== null && book.booking.customerId !== user?.id)}
                    onClick={booking}>
                    {bookingBtnText(book)}
                </button> : <button
                    className={classesList.cardBtn}
                    type="button"
                    data-test-id={DataTestId.BookingButton}
                    onClick={cancelBookingHandler}>
                    Отменить бронь
                </button>}
            </div>
            {isBookingModalOpen && 'booking' in book && book &&
                <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </>
    );
};

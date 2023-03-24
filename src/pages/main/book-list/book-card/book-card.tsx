import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {BookingModal} from '../../../../components/booking-modal/booking-modal';
import {CustomButton} from '../../../../components/custom-elements/button/custom-button';
import {Highlight} from '../../../../components/search-hightlight/search-highlight';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {API_URL} from '../../../../store/api/api-url';
import {libraryApi} from '../../../../store/api/library-api';
import {
    setBookingCancelResponseErrorTrue,
    setBookingCancelResponseSuccessTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../../../store/reducers/request-status-reducer';
import {UserBook} from '../../../../types/book';
import {BookCardInterface} from '../../../../types/book-card';
import {DataTestId} from '../../../../types/constants/constants';
import {BtnType, BtnVariant} from '../../../../types/custom-element';
import {bookingBtnText} from '../../../../utils/booking-btn';
import {cutTitle} from '../../../../utils/cut-title';
import {dateParser} from '../../../../utils/date-utils';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';

interface BookCardProps {
    book: BookCardInterface | UserBook,
    cardView: boolean,
    searchValue?: string,
    bookingId?: number,
    handedIssue?: string,
    wide?: boolean,
    setIsReviewModalOpen?: (state:boolean) => void,
}

export const BookCard = ({book, cardView, searchValue, bookingId, handedIssue, wide, setIsReviewModalOpen}: BookCardProps) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const {user} = useAppSelector(state => state.userReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);
    const booking = () => {
        setIsBookingModalOpen(!isBookingModalOpen);
    }

    const openBook = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/books/${currentCategory.path}/${book.id}`);

    }

    const light = useCallback((title: string) => searchValue ?
        <Highlight filter={searchValue} title={title}/> : title, [searchValue]);

    const [cancelBooking, {
        isLoading: cancelIsLoading,
        isError: cancelIsError,
        isSuccess: cancelIsSuccess
    }] = libraryApi.useCancelBookingMutation();

    const cancelBookingHandler = () => {
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
    }, [cancelIsError, cancelIsLoading, cancelIsSuccess, dispatch, isRequestFetching])

    return (<>
            <div role="button" tabIndex={0}
                 className={classNames(cardView ? classesWindow.card : classesList.card, {[classesWindow.wide]: wide})}
                 onClick={(e) => openBook(e)} data-test-id={DataTestId.Card}>
                {book && typeof book.image === 'string' &&
                    <img className={cardView ? classesWindow.cardImg : classesList.cardImg}
                         src={book.image ? API_URL + book.image : noImageBook}
                         alt={book.title}/>
                }
                {book && typeof book.image !== 'string' &&
                    <img className={cardView ? classesWindow.cardImg : classesList.cardImg}
                         src={book.image ? API_URL + book.image.url : noImageBook}
                         alt={book.title}/>}
                <div
                    className={cardView ? classesWindow.cardRating : classesList.cardRating}>{book && book.rating ?
                    <BookRating rating={book.rating} wrapperTestId="" emptyStarTestId=''
                                filledStarTestId=''/> : 'еще нет оценок'}</div>
                <p className={cardView ? classesWindow.cardTitle : classesList.cardTitle}>{book && light(cutTitle(book.title))}</p>
                <span
                    className={cardView ? classesWindow.cardAuthor : classesList.cardAuthor}>{book && `${book.authors[0]}, ${book.issueYear}`}</span>
                <div className={cardView ? classesWindow.cardBtnWrapper : classesList.cardBtnWrapper} onClick={e => e.stopPropagation()}>
                {book && 'delivery' in book && !handedIssue &&
                    <CustomButton type={BtnType.button} text={bookingBtnText(book)} variant={book.booking === null && !book.delivery ? BtnVariant.primary : BtnVariant.secondary}
                                  clickHandler={booking}
                                  isDisabled={!!book.delivery?.dateHandedTo || (book.booking !== null && book.booking.customerId !== user?.id)}
                                  dataTestId={DataTestId.BookingButton}/>}
                {bookingId && !handedIssue && <CustomButton type={BtnType.submit} text="Отменить бронь"
                                   clickHandler={cancelBookingHandler} dataTestId={DataTestId.BookingButton}/>}
                {handedIssue && <p className={classesList.handedIssue}>ВОЗВРАТ {dateParser(handedIssue)}</p>}

                {setIsReviewModalOpen && <CustomButton type={BtnType.button} text="Оценить"
                                              clickHandler={() =>setIsReviewModalOpen(true)} dataTestId={DataTestId.HistoryReviewButton}/>}
                </div>
            </div>
            {isBookingModalOpen && 'booking' in book && book &&
                <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </>
    );
};

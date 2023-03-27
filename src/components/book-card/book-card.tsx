import React, {useCallback} from 'react';
import classNames from 'classnames';

import noImageBook from '../../assets/other/defaultBook.png'
import {API_URL} from '../../store/api/api-url';
import {UserBook} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {DataTestId} from '../../types/constants/data-test-id';
import {BtnType, BtnVariant, Size} from '../../types/custom-element';
import {CommentShort} from '../../types/review';
import {bookingBtnText} from '../../utils/btn-text';
import {cutTitle} from '../../utils/cut-title';
import {dateParser} from '../../utils/date-utils';
import {BookRating} from '../book-rating/book-rating';
import {BookingModal} from '../booking-modal/booking-modal';
import {CustomButton} from '../custom-elements/button/custom-button';
import {Highlight} from '../search-hightlight/search-highlight';

import {useBookCard} from './use-book-card';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';

interface BookCardProps {
    book: BookCardInterface | UserBook,
    cardView: boolean,
    searchValue?: string,
    bookingId?: number,
    handedIssue?: string,
    fromHistory?: boolean,
    userComment?: CommentShort,
}

export const BookCard = ({
                             book,
                             cardView,
                             searchValue,
                             bookingId,
                             handedIssue,
                             fromHistory,
                             userComment
                         }: BookCardProps) => {
    const {
        openBook,
        cancelBookingHandler,
        booking,
        openReviewModalHandler,
        isBookingModalOpen,
        setIsBookingModalOpen,
        user
    } = useBookCard({book, bookingId, userComment});

    const light = useCallback((title: string) => searchValue ?
        <Highlight filter={searchValue} title={title}/> : title, [searchValue]);

    return (<>
            <div role="button" tabIndex={0}
                 className={classNames(cardView ? classesWindow.card : classesList.card, {[classesWindow.wide]: fromHistory})}
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
                <div
                    className={cardView ? classesWindow.cardBtnWrapper : classesList.cardBtnWrapper}
                    onClick={e => e.stopPropagation()}>
                    {book && 'delivery' in book && !handedIssue &&
                        <CustomButton type={BtnType.button} text={bookingBtnText(book)}
                                      variant={book.booking === null && !book.delivery ? BtnVariant.primary : BtnVariant.secondary}
                                      clickHandler={booking}
                                      isDisabled={!!book.delivery?.dateHandedTo || (book.booking !== null && book.booking.customerId !== user?.id)}
                                      dataTestId={DataTestId.BookingButton}/>}
                    {bookingId && !handedIssue &&
                        <CustomButton type={BtnType.submit} text="Отменить бронь"
                                      clickHandler={cancelBookingHandler}
                                      dataTestId={DataTestId.CancelBookingButton}/>}
                    {handedIssue &&
                        <p className={classesList.handedIssue}>ВОЗВРАТ {dateParser(handedIssue)}</p>}

                    {fromHistory && <CustomButton type={BtnType.button}
                                                  text={userComment ? 'Изменить оценку' : 'Оставить отзыв'}
                                                  dataTestId={DataTestId.HistoryReviewButton}
                                                  clickHandler={openReviewModalHandler}
                                                  variant={userComment ? BtnVariant.secondary : BtnVariant.primary}
                                                  size={Size.small}/>
                    }
                </div>
            </div>
            {isBookingModalOpen && 'booking' in book && book &&
                <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </>
    );
};

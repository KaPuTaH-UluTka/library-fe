import React from 'react';
import classNames from 'classnames';

import BlackChevron from '../../assets/other/black-chevron.svg';
import noImageBook from '../../assets/other/defaultBook.png';
import {BookLink} from '../../components/book-link/book-link';
import {BookingModal} from '../../components/booking-modal/booking-modal';
import {CustomButton} from '../../components/custom-elements/button/custom-button';
import {ReviewItem} from '../../components/review-item/review-item';
import {API_URL} from '../../store/api/api-url';
import {DataTestId} from '../../types/constants/data-test-id';
import {BtnType, BtnVariant, Size} from '../../types/custom-element';
import {bookingBtnText} from '../../utils/btn-text';
import {commentExist} from '../../utils/comment-exist';

import {BookDetails} from './book-details/book-details';
import {Rating} from './rating/rating';
import {Slider} from './slider/slider';
import {useBookPage} from './use-book-page';

import classes from './book-page.module.scss';

export const BookPage = () => {

    const {
        book,
        setIsBookingModalOpen,
        user,
        isReviewsOpen,
        setReviewsState,
        sortedComments,
        openReviewModalHandler,
        isBookingModalOpen
    } = useBookPage();

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
                <Rating book={book}/>
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
                        <CustomButton type={BtnType.button}
                                      text={book.comments && user && commentExist(book.comments, user.id) ? 'Изменить оценку' : 'Оценить книгу'}
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

import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import BlackChevron from '../../assets/black-chevron.svg';
import noImageBook from '../../assets/defaultBook.png';
import {BookLink} from '../../components/book-link/book-link';
import {BookRating} from '../../components/book-rating/book-rating';
import {ErrorView} from '../../components/error-view/error-view';
import {Loader} from '../../components/loader/loader';
import {ReviewItem} from '../../components/review-item/review-item';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {bookApi} from '../../store/reducers/book-reducer';
import {setErrorTrue} from '../../store/reducers/error-reducer';
import {API_URL} from '../../utils/constants';

import {Slider} from './slider/slider';

import classes from './book-page.module.scss';

export const BookPage = () => {

    const location = useLocation();

    const {bookId} = useParams();

    const dispatch = useAppDispatch();

    const {responseError} = useAppSelector(state => state.errorReducer);

    const {data: book, isError, isLoading} = bookApi.useGetBookByIdQuery(bookId ? bookId : null);

    const [isReviewsOpen, setReviewsState] = useState(false);

    useEffect(() => {
        if (isError) {
            dispatch(setErrorTrue());
        }
    },[dispatch, isError])

    const booking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return <section className={classes['book-page']}>
        <div className={classes['book-page-wrapper']}>
            <BookLink bookTitle={book?.title} category={location.state}/>
            {book && <div className={classes['book-page-info']}>
                <div className={classes.book}>
                    {book.images && book.images.length > 1 ? <Slider images={book.images}/> :
                        <img className={classes['book-img']}
                             src={book.images ? API_URL + book.images[0].url : noImageBook}
                             alt={book.title}/>}
                    <div className={classes['book-info']}>
                        <h2 className={classes['book-info-title']}>{book.title}</h2>
                        <div
                            className={classes['book-info-author']}>{`
                            ${book.authors.map(el => el)}
                            ${book.issueYear}`}</div>
                        <button className={classes['book-info-btn-booking']} type="button"
                                disabled={book.delivery && book.delivery.handed ? book.delivery.handed : false}
                                onClick={(e) => booking(e)}>
                            {book.delivery && book.delivery.handed && book.delivery.dateHandedTo ? `Занята до ${book.delivery.dateHandedTo.slice(0, -5)}` : 'Забронировать'}
                        </button>
                        <h5 className={classes['book-info-about-title']}>О книге</h5>
                        <p className={classes['book-info-about-info']}>{book.description}</p>
                    </div>
                </div>
                <div className={classes.rating}>
                    <h5 className={classes['rating-title']}>Рейтинг</h5>
                    <div className={classes['rating-info']}>
                        {book.rating ?
                            <BookRating rating={book.rating}/> :
                            <React.Fragment><BookRating rating={0}/>
                                <span
                                    className={classes['rating-info-not-reviews']}>еще нет оценок</span>
                            </React.Fragment>}
                        {book.rating &&
                            <p className={classes['rating-info-number']}>{book.rating}</p>}
                    </div>
                </div>
                <div className={classes['detailed-info']}>
                    <h5 className={classes['detailed-info-title']}>Подробная информация</h5>
                    <div className={classes['detailed-info-list-wrapper']}>
                        <ul className={classes['detailed-info-list']}>
                            <li className={classes['detailed-info-list-item']}>Издательство
                            </li>
                            <li className={classes['detailed-info-list-item']}>Год
                                издания
                            </li>
                            <li className={classes['detailed-info-list-item']}>Страниц
                            </li>
                            <li className={classes['detailed-info-list-item']}>Переплёт
                            </li>
                            <li className={classes['detailed-info-list-item']}>Формат
                            </li>
                        </ul>
                        <ul className={classes['detailed-info-list']}>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.publish}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.issueYear}</span></li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.pages}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.cover}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.format}</span>
                            </li>
                        </ul>
                        <ul className={classes['detailed-info-list']}>
                            <li className={classes['detailed-info-list-item']}>Жанр
                            </li>
                            <li className={classes['detailed-info-list-item']}>Вес
                            </li>
                            <li className={classes['detailed-info-list-item']}>ISBN
                            </li>
                            <li className={classes['detailed-info-list-item']}>Изготовитель
                            </li>
                        </ul>
                        <ul className={classes['detailed-info-list']}>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.categories.map(el => el)}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{`${book.weight} г.`}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.ISBN}</span>
                            </li>
                            <li className={classes['detailed-info-list-item']}>
                                <span>{book.producer}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.reviews}>
                    <h5 className={classes['reviews-title']}>Отзывы<span>{book.comments ? book.comments.length : 0}</span>
                    </h5>
                    <button
                        className={isReviewsOpen ? classes['reviews-toggle-active'] : classes['reviews-toggle']}
                        onClick={() => isReviewsOpen ? setReviewsState(false) : setReviewsState(true)}
                        data-test-id="button-hide-reviews"
                        type="button"><img src={BlackChevron} alt="black-chevron"/></button>

                    <div className={isReviewsOpen ? classes['reviews-list'] : classes.hide}>
                        {book.comments && book.comments.map((el) => <ReviewItem comment={el}
                                                                                key={el.id}/>)}
                    </div>
                    <button className={classes['reviews-btn']} type="button"
                            data-test-id='button-rating'>
                        Оценить книгу
                    </button>
                </div>
            </div>}
            {isLoading && <Loader/>}
            {responseError && <ErrorView/>}
        </div>
    </section>
};

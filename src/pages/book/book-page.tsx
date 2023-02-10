import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import BlackChevron from '../../assets/black-chevron.svg';
import booksDB from '../../assets/books.json';
import noImageBook from '../../assets/defaultBook.png';
import { BookLink } from '../../components/book-link/book-link';
import { BookRating } from '../../components/book-rating/book-rating';
import { ReviewItem } from '../../components/review-item/review-item';
import { Book } from '../../types/book';

import BookImage from './assets/book.png';
import { Slider } from './slider/slider';

import classes from './book-page.module.scss';

export const BookPage = () => {
    const location = useLocation();

    const [isReviewsOpen, setReviewsState] = useState(false);

    const books: Book[] = booksDB;
    const bookId = location.pathname.split('/')[3];

    const book = books.find((el) => el.id === +bookId) as Book;
    const booking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return <section className={classes['book-page-wrapper']}>
        <BookLink book={book} />
        <div className={classes['book-page']}>
            <div className={classes.book}>
                {book.images && book.images.length > 1 ? <Slider images={book.images} /> :
                    <img className={classes['book-img']}
                         src={book.images ? BookImage : noImageBook}
                         alt={book.name} />}
                <div className={classes['book-info']}>
                    <h2 className={classes['book-info-title']}>{book.name}</h2>
                    <div
                        className={classes['book-info-author']}>{`${book.author}, ${book.issueDate}`}</div>
                    <button className={classes['book-info-btn-booking']} type="button"
                            disabled={book.onBooking}
                            onClick={(e) => booking(e)}>
                        {book.onBooking && book.bookingExpires ? `Занята до ${book.bookingExpires.slice(0, -5)}` : 'Забронировать'}
                    </button>
                    <h5 className={classes['book-info-about-title']}>О книге</h5>
                    <p className={classes['book-info-about-info']}>{book.about}</p>
                </div>
            </div>
            <div className={classes.rating}>
                <h5 className={classes['rating-title']}>Рейтинг</h5>
                <div className={classes['rating-info']}>
                    {book.rating ?
                        <BookRating rating={book.rating} /> :
                        <React.Fragment><BookRating rating={0} />
                            <span
                                className={classes['rating-info-not-reviews']}>еще нет оценок</span>
                        </React.Fragment>}
                    {book.rating && <p className={classes['rating-info-number']}>{book.rating}</p>}
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
                            <span>{book.publishing}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}>
                            <span>{book.issueDate}</span></li>
                        <li className={classes['detailed-info-list-item']}>
                            <span>{book.pagesCount}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}>
                            <span>{book.binding}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}><span>{book.size}</span>
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
                        <li className={classes['detailed-info-list-item']}><span>{book.genre}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}>
                            <span>{book.weight}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}><span>{book.isbn}</span>
                        </li>
                        <li className={classes['detailed-info-list-item']}>
                            <span>{book.producer}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.reviews}>
                <h5 className={classes['reviews-title']}>Отзывы<span>{book.reviews?.length || 0}</span>
                </h5>
                <button
                    className={isReviewsOpen ? classes['reviews-toggle-active'] : classes['reviews-toggle']}
                    onClick={() => isReviewsOpen ? setReviewsState(false) : setReviewsState(true)}
                    data-test-id="button-hide-reviews"
                    type="button"><img src={BlackChevron} alt="black-chevron" /></button>

                <div className={isReviewsOpen ? classes['reviews-list'] : classes.hide}>
                    {book.reviews?.map((el) => <ReviewItem review={el} key={el.userId} />)}
                </div>
                <button className={classes['reviews-btn']} type="button" data-test-id='button-rating'>
                    Оценить книгу
                </button>
            </div>
        </div>
    </section>;
};

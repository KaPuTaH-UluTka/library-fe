import React from 'react';
import {useNavigate} from 'react-router-dom';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {Book} from '../../../../types/book';

import BookImage from './assets/book.png';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';

export const BookCard = (props: { book: Book, listState: boolean } ) => {
    const navigate = useNavigate();
    const booking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    }

    const openBook = () => {
        navigate(`/books/${props.book.category}/${props.book.id}`);
    }

    return (
        <div role="button" tabIndex={0} className={props.listState ? classesWindow.card : classesList.card} onMouseDown={openBook} data-test-id='card'>
            <img className={props.listState ? classesWindow['card-img'] : classesList['card-img']} src={props.book.images ? BookImage : noImageBook}
                 alt={props.book.name}/>
            <div className={props.listState ? classesWindow['card-rating'] : classesList['card-rating']}>{props.book.rating ?
                <BookRating rating={props.book.rating}/> : 'еще нет оценок'}</div>
            <p className={props.listState ? classesWindow['card-title'] : classesList['card-title']}>{props.book.name}</p>
            <span className={props.listState ? classesWindow['card-author'] : classesList['card-author']}>{`${props.book.author}, ${props.book.issueDate}`}</span>
            <button className={props.listState ? classesWindow['card-btn'] : classesList['card-btn']} type="button"
                    disabled={props.book.onBooking}
                    onMouseDown={(e) => booking(e)}>
                {props.book.onBooking && props.book.bookingExpires ? `Занята до ${props.book.bookingExpires.slice(0, -5)}` : 'Забронировать'}
            </button>
        </div>
    );
};

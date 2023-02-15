import React from 'react';
import {useNavigate} from 'react-router-dom';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {useAppSelector} from '../../../../hooks/redux';
import {Book} from '../../../../types/book';

import BookImage from './assets/book.png';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';

export const BookCard = (props: { book: Book } ) => {
    const navigate = useNavigate();

    const {listView} = useAppSelector(state => state.listViewReducer);
    const booking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    }

    const openBook = () => {
        navigate(`/books/${props.book.category}/${props.book.id}`);
    }

    return (
        <div role="button" tabIndex={0} className={listView ? classesWindow.card : classesList.card} onMouseDown={openBook} data-test-id='card'>
            <img className={listView ? classesWindow['card-img'] : classesList['card-img']} src={props.book.images ? BookImage : noImageBook}
                 alt={props.book.name}/>
            <div className={listView ? classesWindow['card-rating'] : classesList['card-rating']}>{props.book.rating ?
                <BookRating rating={props.book.rating}/> : 'еще нет оценок'}</div>
            <p className={listView ? classesWindow['card-title'] : classesList['card-title']}>{props.book.name}</p>
            <span className={listView ? classesWindow['card-author'] : classesList['card-author']}>{`${props.book.author}, ${props.book.issueDate}`}</span>
            <button className={listView ? classesWindow['card-btn'] : classesList['card-btn']} type="button"
                    disabled={props.book.onBooking}
                    onMouseDown={(e) => booking(e)}>
                {props.book.onBooking && props.book.bookingExpires ? `Занята до ${props.book.bookingExpires.slice(0, -5)}` : 'Забронировать'}
            </button>
        </div>
    );
};

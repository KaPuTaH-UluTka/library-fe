import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {BookingModal} from '../../../../components/booking-modal/booking-modal';
import {Highlight} from '../../../../components/search-hightlight/search-highlight';
import {useAppSelector} from '../../../../hooks/redux';
import {API_URL} from '../../../../store/api/api-url';
import {BookCardInterface} from '../../../../types/book-card';
import {DataTestId} from '../../../../types/constants/constants';
import {dateParser} from '../../../../utils/date-parser';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';

interface BookCardProps { book: BookCardInterface, searchValue: string }


export const BookCard = ({book, searchValue}: BookCardProps) => {
    const navigate = useNavigate();

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const {listView} = useAppSelector(state => state.listViewReducer);
    const booking = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookingModalOpen(!isBookingModalOpen);
    }
    const {currentCategory} = useAppSelector(state => state.categoryReducer);
    const openBook = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/books/${currentCategory.path}/${book.id}`, {state: book.categories[0]});
    }

    const light = useCallback((title: string) => searchValue ? <Highlight filter={searchValue} title={title} /> : title, [searchValue]);

    const cutTitle = (title:string) => title.length > 54 ? `${title.slice(0, 54)  }...` : title

    return (<>
        <div role="button" tabIndex={0} className={listView ? classesWindow.card : classesList.card} onClick={(e)=> openBook(e)} data-test-id={DataTestId.Card}>
            <img className={listView ? classesWindow.cardImg : classesList.cardImg} src={book.image ? API_URL + book.image.url : noImageBook}
                 alt={book.title}/>
            <div className={listView ? classesWindow.cardRating : classesList.cardRating}>{book.rating ?
                <BookRating rating={book.rating} wrapperTestId="" emptyStarTestId='' filledStarTestId=''/> : 'еще нет оценок'}</div>
            <p className={listView ? classesWindow.cardTitle : classesList.cardTitle}>{light(cutTitle(book.title))}</p>
            <span className={listView ? classesWindow.cardAuthor : classesList.cardAuthor}>{`${book.authors.map(el => el)}, ${book.issueYear}`}</span>
            <button className={listView ? classesWindow.cardBtn : classesList.cardBtn} type="button"
                    disabled={book.delivery && book.delivery.handed ? book.delivery.handed : false}
                    onClick={(e) => booking(e)}>
                {book.delivery && book.delivery.handed && book.delivery.dateHandedTo ? `Занята до ${dateParser(book.delivery.dateHandedTo)}` : 'Забронировать'}
            </button>
        </div>
            {isBookingModalOpen && book && <BookingModal setIsModalOpen={setIsBookingModalOpen} selectedBook={book}/>}
        </>
    );
};

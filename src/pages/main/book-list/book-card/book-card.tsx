import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import noImageBook from '../../../../assets/defaultBook.png'
import {BookRating} from '../../../../components/book-rating/book-rating';
import {Highlight} from '../../../../components/search-hightlight/search-highlight';
import {useAppSelector} from '../../../../hooks/redux';
import {API_URL} from '../../../../store/api/api-url';
import {BookCardInterface} from '../../../../types/book-card';

import classesList from './book-card-list.module.scss';
import classesWindow from './book-card-window.module.scss';
import {dateParser} from "../../../../utils/date-parser";

export const BookCard = (props: { book: BookCardInterface, searchValue: string } ) => {
    const navigate = useNavigate();

    const {listView} = useAppSelector(state => state.listViewReducer);
    const booking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    }
    const {currentCategory} = useAppSelector(state => state.categoryReducer);
    const openBook = () => {
        navigate(`/books/${currentCategory.path}/${props.book.id}`, {state: props.book.categories[0]});
    }

    const light = useCallback((title: string) => props.searchValue ? <Highlight filter={props.searchValue} title={title} /> : title, [props.searchValue]);

    const cutTitle = (title:string) => title.length > 54 ? `${title.slice(0, 54)  }...` : title

    return (
        <div role="button" tabIndex={0} className={listView ? classesWindow.card : classesList.card} onMouseDown={openBook} data-test-id='card'>
            <img className={listView ? classesWindow['card-img'] : classesList['card-img']} src={props.book.image ? API_URL + props.book.image.url : noImageBook}
                 alt={props.book.title}/>
            <div className={listView ? classesWindow['card-rating'] : classesList['card-rating']}>{props.book.rating ?
                <BookRating rating={props.book.rating} wrapperTestId="" emptyStarTestId='' filledStarTestId=''/> : 'еще нет оценок'}</div>
            <p className={listView ? classesWindow['card-title'] : classesList['card-title']}>{light(cutTitle(props.book.title))}</p>
            <span className={listView ? classesWindow['card-author'] : classesList['card-author']}>{`${props.book.authors.map(el => el)}, ${props.book.issueYear}`}</span>
            <button className={listView ? classesWindow['card-btn'] : classesList['card-btn']} type="button"
                    disabled={props.book.delivery && props.book.delivery.handed ? props.book.delivery.handed : false}
                    onClick={(e) => booking(e)}>
                {props.book.delivery && props.book.delivery.handed && props.book.delivery.dateHandedTo ? `Занята до ${dateParser(props.book.delivery.dateHandedTo)}` : 'Забронировать'}
            </button>
        </div>
    );
};

import React from 'react';

import booksDB from '../../../assets/books.json';
import {useAppSelector} from '../../../hooks/redux';
import { Book } from '../../../types/book';

import { BookCard } from './book-card/book-card';
import { ListSettings } from './list-settings/list-settings';

import classes from './book-list.module.scss';
import {bookApi} from "../../../store/reducers/book-reducer";

export const BookList = () => {
    const {data: allBooks} = bookApi.useGetAllBooksQuery();

    const books: Book[] = booksDB;

    const listView = useAppSelector(state => state.listViewReducer);


    return (
        <div className={classes['book-list-wrapper']}>
            <ListSettings/>
        <div className={listView ? classes['window-style'] : classes['list-style']}>
            {books.map(el => <BookCard book={el} key={el.id}/>)}
        </div>
        </div>
    );
};

import React, { useState } from 'react';

import booksDB from '../../../assets/books.json';
import { Book } from '../../../types/book';

import { BookCard } from './book-card/book-card';
import { ListSettings } from './list-settings/list-settings';

import classes from './book-list.module.scss';

export const BookList = () => {
    const books: Book[] = booksDB;
    const [listState, setListState] = useState(true);


    return (
        <div className={classes['book-list-wrapper']}>
            <ListSettings listState={listState} setListState={setListState}/>
        <div className={listState ? classes['window-style'] : classes['list-style']}>
            {books.map(el => <BookCard book={el} key={el.id} listState={listState}/>)}
        </div>
        </div>
    );
};

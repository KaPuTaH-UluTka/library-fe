import React from 'react';

import {Book} from '../../types/book';

import classes from './book-link.module.scss';

export const BookLink = ({book}: { book: Book }) => (
    <div className={classes['book-link-wrapper']}>
        <div className={classes['book-link']}>
            <p className={classes['book-link-text']}>{book.genre}<span>/</span>{book.name}</p>
        </div>
    </div>
);

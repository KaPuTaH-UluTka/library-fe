import React from 'react';

import {BookInterface} from '../../types/upd-book';

import classes from './book-link.module.scss';

export const BookLink = ({book}: { book: BookInterface }) => (
    <div className={classes['book-link-wrapper']}>
        <div className={classes['book-link']}>
            <p className={classes['book-link-text']}>{book.categories[0]}<span>/</span>{book.title}</p>
        </div>
    </div>
);

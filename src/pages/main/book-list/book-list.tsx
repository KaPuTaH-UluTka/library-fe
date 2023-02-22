import React, {useEffect, useState} from 'react';

import {ErrorView} from '../../../components/error-view/error-view';
import {Loader} from '../../../components/loader/loader';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {bookApi} from '../../../store/reducers/book-reducer';
import {setErrorTrue} from '../../../store/reducers/error-reducer';

import {BookCard} from './book-card/book-card';
import {ListSettings} from './list-settings/list-settings';

import classes from './book-list.module.scss';

export const BookList = () => {
    const dispatch = useAppDispatch();

    const {data: books, isLoading, isError} = bookApi.useGetAllBooksQuery();

    const {responseError} = useAppSelector(state => state.errorReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    const {sortOrder} = useAppSelector(state => state.sortOrderReducer);

    const listView = useAppSelector(state => state.listViewReducer);

    const filterBooks = () => {
        if (books && currentCategory.name) {
            let filteredBooks;

            if (currentCategory.path === 'all') {
                filteredBooks = books;
            } else {
                filteredBooks = books.filter(el => currentCategory.name ? el.categories.includes(currentCategory.name) : null);
            }
            let sortedBooks;
            const booksForSort = [...filteredBooks];

            if (sortOrder) {
                sortedBooks = booksForSort.sort((a, b) => a.rating - b.rating);
            } else {
                sortedBooks = booksForSort.sort((a, b) => b.rating - a.rating);
            }

            return sortedBooks;

        }

        return books;
    }

    const correctBooks = filterBooks();

    useEffect(() => {
        if (isError) {
            dispatch(setErrorTrue());
        }
    }, [dispatch, isError]);

    return (
        <React.Fragment>
            <div className={classes['book-list-wrapper']}>
                <ListSettings sortOrder={sortOrder}/>
                <div className={listView ? classes['window-style'] : classes['list-style']}>
                    {correctBooks && correctBooks.map(el => <BookCard book={el} key={el.id}/>)}
                </div>
                {isLoading && <Loader/>}
            </div>
            {responseError && <ErrorView/>}
        </React.Fragment>
    );
};

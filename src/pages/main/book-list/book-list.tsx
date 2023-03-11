import React, {useEffect, useState} from 'react';

import {BookNotExist} from '../../../components/book-not-exist/book-not-exist';
import {Loader} from '../../../components/loader/loader';
import {Toast} from '../../../components/toast/toast';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setBooks} from '../../../store/reducers/book-reducer';
import {setErrorTrue} from '../../../store/reducers/error-reducer';
import {DataTestId, ToastMessages} from '../../../types/constants/constants';

import {BookCard} from './book-card/book-card';
import {ListSettings} from './list-settings/list-settings';

import classes from './book-list.module.scss';

export const BookList = () => {
    const dispatch = useAppDispatch();
    const {data: books, isLoading, isError} = libraryApi.useGetAllBooksQuery();

    const {responseError} = useAppSelector(state => state.errorReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    const {sortOrder} = useAppSelector(state => state.sortOrderReducer);

    const listView = useAppSelector(state => state.listViewReducer);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        if(books) dispatch(setBooks(books));

        if (isError) {
            dispatch(setErrorTrue());
        }
    }, [books, dispatch, isError])

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

            if (searchValue) {
               return sortedBooks.filter(el => el.title.slice(0, 54).toLowerCase().includes(searchValue.toLowerCase()));
            }

            return sortedBooks;

        }

        return books;
    }

    const correctBooks = filterBooks();

    return (
        <React.Fragment>
            <div className={classes['book-list-wrapper']}>
                <ListSettings sortOrder={sortOrder} searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div className={listView ? classes['window-style'] : classes['list-style']}>
                    {correctBooks && correctBooks.map(el => <BookCard book={el} key={el.id} searchValue={searchValue}/>)}
                </div>
                {isLoading && <Loader/>}
                {correctBooks && correctBooks.length === 0 && searchValue && <BookNotExist templateToShow={false}/>}
                {correctBooks && correctBooks.length === 0 && !searchValue && <BookNotExist templateToShow={true}/>}
            </div>
            {true && <Toast testId={DataTestId.Error} error={true} message={ToastMessages.responseError}/>}
        </React.Fragment>
    );
};

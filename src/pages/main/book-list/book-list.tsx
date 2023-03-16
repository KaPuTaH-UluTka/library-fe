import React, {useEffect, useState} from 'react';

import {BookNotExist} from '../../../components/book-not-exist/book-not-exist';
import {Toast} from '../../../components/toast/toast';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setBooks} from '../../../store/reducers/book-reducer';
import {setErrorTrue, setLoadingFalse, setLoadingTrue} from '../../../store/reducers/request-status-reducer';
import {ToastMessages} from '../../../types/constants/constants';
import {bookFilter} from '../../../utils/book-filter';

import {BookCard} from './book-card/book-card';
import {ListSettings} from './list-settings/list-settings';

import classes from './book-list.module.scss';

export const BookList = () => {
    const dispatch = useAppDispatch();

    const {data: books, isLoading, isError} = libraryApi.useGetAllBooksQuery();

    const {responseError} = useAppSelector(state => state.requestStatusReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    const {sortOrder} = useAppSelector(state => state.sortOrderReducer);

    const listView = useAppSelector(state => state.listViewReducer);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if(books) dispatch(setBooks(books));

        if (isError) {
            dispatch(setErrorTrue());
        }
        if(isLoading){
            dispatch(setLoadingTrue())
        } else {
            dispatch(setLoadingFalse())
        }
    }, [books, dispatch, isError, isLoading])

    const correctBooks = bookFilter(books, currentCategory, sortOrder, searchValue);

    return (
        <div className={classes.bookListWrapper}>
                <ListSettings sortOrder={sortOrder} searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div className={listView ? classes.windowStyle : classes.listStyle}>
                    {correctBooks && correctBooks.map(el => <BookCard book={el} key={el.id} searchValue={searchValue}/>)}
                </div>
                {correctBooks && correctBooks.length === 0 && searchValue && <BookNotExist templateToShow={false}/>}
                {correctBooks && correctBooks.length === 0 && !searchValue && <BookNotExist templateToShow={true}/>}
            </div>
    );
};

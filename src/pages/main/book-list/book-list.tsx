import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {bookApi} from '../../../store/reducers/book-reducer';

import {BookCard} from './book-card/book-card';
import {ListSettings} from './list-settings/list-settings';

import classes from './book-list.module.scss';
import {Loader} from '../../../components/loader/loader';
import {setErrorTrue} from '../../../store/reducers/error-reducer';
import {ErrorView} from '../../../components/error-view/error-view';

export const BookList = () => {
    const dispatch = useAppDispatch();

    const {data: books, isLoading, isError} = bookApi.useGetAllBooksQuery();
    const {responseError} = useAppSelector(state => state.errorReducer);

    const listView = useAppSelector(state => state.listViewReducer);

    useEffect(() => {
        if (isError) {
            dispatch(setErrorTrue());
        }
    },[dispatch, isError]);

    return (
        <React.Fragment>
            <div className={classes['book-list-wrapper']}>
                <ListSettings/>
                <div className={listView ? classes['window-style'] : classes['list-style']}>
                    {books && books.map(el => <BookCard book={el} key={el.id}/>)}
                </div>
                {isLoading && <Loader/>}
            </div>
            {responseError && <ErrorView/>}
        </React.Fragment>
    );
};

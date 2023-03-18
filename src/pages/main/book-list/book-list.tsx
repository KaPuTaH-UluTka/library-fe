import {useEffect, useState} from 'react';

import {BookNotExist} from '../../../components/book-not-exist/book-not-exist';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setBooks} from '../../../store/reducers/book-reducer';
import {
    setBaseResponseErrorTrue, setFetchingFalse, setFetchingTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../../store/reducers/request-status-reducer';
import {DataTestId} from '../../../types/constants/constants';
import {bookFilter} from '../../../utils/book-filter';

import {BookCard} from './book-card/book-card';
import {ListSettings} from './list-settings/list-settings';

import classes from './book-list.module.scss';

export const BookList = () => {
    const dispatch = useAppDispatch();

    const {data: books, isFetching, isError} = libraryApi.useGetAllBooksQuery();

    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    const {sortOrder} = useAppSelector(state => state.sortOrderReducer);

    const listView = useAppSelector(state => state.listViewReducer);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if(books) dispatch(setBooks(books));

        if (isError) {
            dispatch(setBaseResponseErrorTrue());
        }
        if (isFetching) {
            dispatch(setLoadingTrue());
            dispatch(setFetchingTrue());
        } else {
            dispatch(setLoadingFalse());
            dispatch(setFetchingFalse());
        }
    }, [books, dispatch, isError, isFetching]);

    const correctBooks = bookFilter(books, currentCategory, sortOrder, searchValue);

    return (
        <div className={classes.bookListWrapper}>
                <ListSettings sortOrder={sortOrder} searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div className={listView ? classes.windowStyle : classes.listStyle} data-test-id={DataTestId.Content}>
                    {correctBooks && correctBooks.map(el => <BookCard book={el} key={el.id} searchValue={searchValue}/>)}
                </div>
                {correctBooks && correctBooks.length === 0 && searchValue && <BookNotExist templateToShow={false}/>}
                {correctBooks && correctBooks.length === 0 && !searchValue && <BookNotExist templateToShow={true}/>}
            </div>
    );
};

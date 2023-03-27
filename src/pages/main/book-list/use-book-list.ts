import {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setBooks} from '../../../store/reducers/book-reducer';
import {setCategories} from '../../../store/reducers/category-reducer';
import {
    setBaseResponseErrorTrue, setFetchingFalse, setFetchingTrue, setLoadingFalse,
    setLoadingTrue
} from '../../../store/reducers/request-status-reducer';
import {bookFilter} from '../../../utils/book-filter';

export const useBookList = () => {
    const dispatch = useAppDispatch();

    const {data: books, isFetching, isError} = libraryApi.useGetAllBooksQuery();

    const {data: bookCategories} = libraryApi.useGetBookCategoriesQuery();

    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    const {sortOrder} = useAppSelector(state => state.sortOrderReducer);

    const {cardView} = useAppSelector(state => state.cardViewReducer);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(setCategories(bookCategories));
        if (books) dispatch(setBooks(books));

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
    }, [bookCategories, books, dispatch, isError, isFetching]);

    const correctBooks = bookFilter(books, currentCategory, sortOrder, searchValue);

    return {sortOrder, searchValue, setSearchValue, cardView, correctBooks}
}

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {skipToken} from '@reduxjs/toolkit/dist/query/react';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {
    setBaseResponseErrorTrue, setFetchingFalse, setFetchingTrue, setLoadingFalse,
    setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {
    setCurrentBookId,
    setCurrentComment,
    setIsReviewModalTrue
} from '../../store/reducers/review-modal-reducer';
import {BookInterface, CommentInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';

export const useBookPage = () => {
    const {bookId} = useParams();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const {
        data: bookData,
        isError,
        isFetching
    } = libraryApi.useGetBookByIdQuery(Number(bookId) || skipToken);

    const {data: categories} = libraryApi.useGetBookCategoriesQuery();

    const [isReviewsOpen, setReviewsState] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const [trigger] = libraryApi.useLazyGetBookByIdQuery();

    const body = document.querySelector('body') as HTMLElement;

    let book: BookCardInterface | BookInterface | null = null;

    if (bookData && !('length' in bookData)) {
        book = bookData;
    }
    if (bookData && ('length' in bookData) && bookId) {
        book = bookData[+bookId - 1];
    }

    const copiedComments: CommentInterface[] = [];

    book?.comments?.forEach((el: CommentInterface) => copiedComments.push(el));

    const sortedComments = copiedComments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    const openReviewModalHandler = () => {
        if (book) {
            trigger(book?.id);
        }
        const userComment = user?.comments?.find((comment) => comment.bookId === book?.id);

        dispatch(setCurrentBookId(book?.id));
        dispatch(setCurrentComment(userComment));
        dispatch(setIsReviewModalTrue());
    }

    useEffect(() => {
        if (isError) {
            dispatch(setBaseResponseErrorTrue());
        }
        if (isBookingModalOpen) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
        if (isFetching) {
            dispatch(setLoadingTrue());
            dispatch(setFetchingTrue());
        } else {
            dispatch(setLoadingFalse());
            dispatch(setFetchingFalse());
        }
    }, [body.classList, dispatch, isBookingModalOpen, isError, isFetching]);

    return {
        book,
        setIsBookingModalOpen,
        user,
        isReviewsOpen,
        setReviewsState,
        sortedComments,
        openReviewModalHandler,
        isBookingModalOpen
    }
}

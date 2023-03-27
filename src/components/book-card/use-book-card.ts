import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {
    setBookingCancelResponseErrorTrue,
    setBookingCancelResponseSuccessTrue, setLoadingFalse, setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {
    setCurrentBookId,
    setCurrentComment,
    setIsReviewModalTrue
} from '../../store/reducers/review-modal-reducer';
import {UserBook} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {CommentShort} from '../../types/review';

interface UseBookCardProps {
    book: BookCardInterface | UserBook,
    bookingId?: number,
    userComment?: CommentShort,
}

export const useBookCard = ({book, bookingId, userComment}: UseBookCardProps) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const {user} = useAppSelector(state => state.userReducer);

    const {currentCategory} = useAppSelector(state => state.categoryReducer);
    const booking = () => {
        setIsBookingModalOpen(!isBookingModalOpen);
    }

    const [trigger] = libraryApi.useLazyGetBookByIdQuery();

    const openBook = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/books/${currentCategory.path}/${book.id}`);

    }

    const [cancelBooking, {
        isLoading: cancelIsLoading,
        isError: cancelIsError,
        isSuccess: cancelIsSuccess
    }] = libraryApi.useCancelBookingMutation();

    const cancelBookingHandler = () => {
        if (bookingId) cancelBooking(bookingId.toString());
    }

    const openReviewModalHandler = () => {
        trigger(book.id);

        dispatch(setCurrentBookId(book.id));
        dispatch(setCurrentComment(userComment));
        dispatch(setIsReviewModalTrue());
    }

    useEffect(() => {
        if (cancelIsSuccess && !isRequestFetching) {
            dispatch(setBookingCancelResponseSuccessTrue());
        }
        if (cancelIsError && !isRequestFetching) {
            dispatch(setBookingCancelResponseErrorTrue());
        }
        if (cancelIsLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [cancelIsError, cancelIsLoading, cancelIsSuccess, dispatch, isRequestFetching])

    return {
        openBook,
        cancelBookingHandler,
        booking,
        openReviewModalHandler,
        isBookingModalOpen,
        setIsBookingModalOpen,
        user
    }
}

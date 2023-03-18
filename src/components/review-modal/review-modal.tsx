import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {
    setCommentResponseSuccessTrue, setBaseResponseErrorTrue,
    setLoadingFalse,
    setLoadingTrue, setCommentResponseErrorTrue
} from '../../store/reducers/request-status-reducer';
import {DataTestId} from '../../types/constants/constants';
import {ReviewFields} from '../../types/review';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';
import {BookRatingSelect} from '../book-rating-select/book-rating-select';

import classes from './review-modal.module.scss';

interface ReviewProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}


export const ReviewModal = ({setIsModalOpen}: ReviewProps) => {

    const {register, handleSubmit, control} = useForm<ReviewFields>({
        defaultValues: {rating: 1},
    });

    const dispatch = useAppDispatch();

    const [createComment, {isSuccess, isError, isLoading}] = libraryApi.useCreateCommentMutation();

    const {user} = useAppSelector(state => state.userReducer);

    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const {bookId} = useParams();

    const submitHandler: SubmitHandler<ReviewFields> = data => {
        if (user && bookId)
            createComment({
                data: {
                    ...data,
                    user: user.id.toString(),
                    book: bookId
                }
            })
    }

    useEffect(() => {
        if (isError && !isRequestFetching) {
            dispatch(setCommentResponseErrorTrue());
            setIsModalOpen(false);
        }
        if (isSuccess && !isRequestFetching) {
            dispatch(setCommentResponseSuccessTrue());
            setIsModalOpen(false);
        }
        if (isLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [dispatch, isError, isLoading, isRequestFetching, isSuccess, setIsModalOpen]);

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }

    return (
        <BookModalLayout clickEvent={closeHandler}
                         wrapperTestId={DataTestId.ModalRateBook}>

            <form className={classes.reviewModal} onSubmit={handleSubmit(submitHandler)}>
                <h2 className={classes.title} data-test-id={DataTestId.ModalTitle}>Оцените
                    книгу</h2>
                <div className={classes.rating}>
                    <h3 className={classes.ratingTitle}>Ваша оценка</h3>
                    <BookRatingSelect control={control}/>
                </div>
                <textarea className={classes.review}
                          data-test-id={DataTestId.Comment} {...register('text', {required: 'Поле не может быть пустым'})}
                          placeholder='Комментарий'
                />
                <button type='submit' className={classes.submit}
                        data-test-id={DataTestId.ButtonComment}>Оценить
                </button>
            </form>
        </BookModalLayout>)
};

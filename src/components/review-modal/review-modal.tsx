import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {
    setCommentResponseErrorTrue,
    setCommentResponseSuccessTrue,
    setCommentUpdateResponseErrorTrue,
    setCommentUpdateResponseSuccessTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {setIsReviewModalFalse} from '../../store/reducers/review-modal-reducer';
import {DataTestId} from '../../types/constants/data-test-id';
import {BtnType, Size} from '../../types/custom-element';
import {CommentFields} from '../../types/review';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';
import {BookRatingSelect} from '../book-rating-select/book-rating-select';
import {CustomButton} from '../custom-elements/button/custom-button';

import classes from './review-modal.module.scss';

export const ReviewModal = () => {

    const dispatch = useAppDispatch();

    const {currentComment, currentBookId} = useAppSelector(state => state.reviewModalReducer);

    const {user} = useAppSelector(state => state.userReducer);

    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const {register, handleSubmit, control} = useForm<CommentFields>({
        defaultValues: {rating: currentComment?.rating || 5, text: currentComment?.text || ''},
    });

    const [createComment, {isSuccess: isCreateSuccess, isError: isCreateError, isLoading: isCreateLoading}] = libraryApi.useCreateCommentMutation();

    const [updateComment, {isSuccess: isUpdateSuccess, isError: isUpdateError, isLoading: isUpdateLoading}] = libraryApi.useUpdateCommentMutation();




    const submitHandler: SubmitHandler<CommentFields> = data => {
        if (user && currentBookId && !currentComment){
            createComment({
                data: {
                    ...data,
                    user: user.id.toString(),
                    book: currentBookId.toString()
                }
            })} else if (user && currentBookId && currentComment) {
            updateComment({
                commentId: currentComment.id,
                data: {
                    ...data,
                    user: user.id.toString(),
                    book: currentBookId.toString()
                },
            })
        }

    }

    useEffect(() => {
        if (isCreateError && !isRequestFetching) {
            dispatch(setCommentResponseErrorTrue());
            dispatch(setIsReviewModalFalse());
        }
        if (isCreateSuccess && !isRequestFetching) {
            dispatch(setCommentResponseSuccessTrue());
            dispatch(setIsReviewModalFalse());
        }
        if (isUpdateError && !isRequestFetching) {
            dispatch(setCommentUpdateResponseErrorTrue());
            dispatch(setIsReviewModalFalse());
        }
        if (isUpdateSuccess && !isRequestFetching) {
            dispatch(setCommentUpdateResponseSuccessTrue());
            dispatch(setIsReviewModalFalse());
        }
        if (isCreateLoading || isUpdateLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [dispatch, isCreateError, isCreateLoading, isCreateSuccess, isRequestFetching, isUpdateError, isUpdateLoading, isUpdateSuccess]);

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setIsReviewModalFalse());
    }

    return (
        <BookModalLayout clickEvent={closeHandler}
                         wrapperTestId={DataTestId.ModalRateBook}>

            <form className={classes.reviewModal} onSubmit={handleSubmit(submitHandler)}>
                <h2 className={classes.title} data-test-id={DataTestId.ModalTitle}>Оцените
                    книгу</h2>
                <div className={classes.rating}>
                    <h3 className={classes.ratingTitle}>Ваша оценка</h3>
                    <BookRatingSelect control={control} userRating={currentComment?.rating}/>
                </div>
                <textarea className={classes.review}
                          data-test-id={DataTestId.Comment} {...register('text', {required: 'Поле не может быть пустым'})}
                          placeholder='Комментарий'
                />

                <CustomButton type={BtnType.submit} text="Оценить" clickHandler={() => submitHandler} dataTestId={DataTestId.ButtonComment} size={Size.big}/>
            </form>
        </BookModalLayout>)
};

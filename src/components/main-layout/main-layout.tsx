import React from 'react';
import {Navigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {useAppSelector} from '../../hooks/redux';
import {AppPaths, ToastMessages} from '../../types/constants/constants';
import {Loader} from '../loader/loader';
import {Toast} from '../toast/toast';

export const MainLayout = ({children}: { children: JSX.Element }) => {
    const {token} = useAppSelector(state => state.userReducer);

    const {
        isRequestLoading,
        isBaseResponseError,
        isBookingCreateResponseError,
        isBookingCreateResponseSuccess,
        isBookingUpdateResponseError,
        isBookingUpdateResponseSuccess,
        isBookingCancelResponseError,
        isBookingCancelResponseSuccess,
        isCommentResponseError,
        isCommentResponseSuccess
    } = useAppSelector(state => state.requestStatusReducer);

    if (!token) {
        return <Navigate to={AppPaths.auth}/>;
    }

    return <>
        <Header/>
        {children}
        <Footer/>
        {isRequestLoading && <Loader/>}
        {isBaseResponseError && <Toast error={true} message={ToastMessages.responseError}/>}
        {isBookingCreateResponseError && <Toast error={true} message={ToastMessages.bookingCreateError}/>}
        {isBookingCreateResponseSuccess && <Toast error={false} message={ToastMessages.bookingCreateSuccess}/>}
        {isBookingUpdateResponseError && <Toast error={true} message={ToastMessages.bookingUpdateError}/>}
        {isBookingUpdateResponseSuccess && <Toast error={false} message={ToastMessages.bookingUpdateSuccess}/>}
        {isBookingCancelResponseError && <Toast error={true} message={ToastMessages.bookingCancelError}/>}
        {isBookingCancelResponseSuccess && <Toast error={false} message={ToastMessages.bookingCancelSuccess}/>}
        {isCommentResponseError && <Toast error={true} message={ToastMessages.commentError}/>}
        {isCommentResponseSuccess && <Toast error={false} message={ToastMessages.commentSuccess}/>}
    </>
};

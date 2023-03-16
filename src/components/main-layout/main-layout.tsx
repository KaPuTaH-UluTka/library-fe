import React from 'react';
import {Navigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {useAppSelector} from '../../hooks/redux';
import {AppPaths, ToastMessages} from '../../types/constants/constants';
import {Loader} from '../loader/loader';
import {Toast} from '../toast/toast';

export const MainLayout = ({children}: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');

    const {
        isRequestLoading,
        responseError,
        isBookingResponseError,
        isBookingResponseSuccess,
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
        {responseError && <Toast error={true} message={ToastMessages.responseError}/>}
        {isBookingResponseError && <Toast error={true} message={ToastMessages.bookingError}/>}
        {isBookingResponseSuccess && <Toast error={false} message={ToastMessages.bookingSuccess}/>}
        {isCommentResponseError && <Toast error={true} message={ToastMessages.commentError}/>}
        {isCommentResponseSuccess && <Toast error={false} message={ToastMessages.commentSuccess}/>}
    </>
};

import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {setUser} from '../../store/reducers/user-reducer';
import {AppPaths} from '../../types/constants/constants';
import {Loader} from '../loader/loader';
import {Toast} from '../toast/toast';
import {ReviewModal} from '../review-modal/review-modal';
import {
    setBaseResponseErrorTrue, setFetchingFalse, setFetchingTrue, setLoadingFalse,
    setLoadingTrue
} from "../../store/reducers/request-status-reducer";

export const MainLayout = ({children}: { children: JSX.Element }) => {
    const {token} = useAppSelector(state => state.userReducer);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [trigger, {data, isSuccess}] = libraryApi.useLazyMeQuery();

    const {
        isRequestLoading,
        isRequestFetching,
        isResponseError,
        isResponseSuccess,
        responseErrorText,
    } = useAppSelector(state => state.requestStatusReducer);

    const {isReviewModal} = useAppSelector(state => state.reviewModalReducer);

    const body = document.querySelector('body') as HTMLElement;

    useEffect(() => {
        if (token) {
            trigger();
        } else {
            navigate(AppPaths.auth);
        }
        if(isSuccess){
            dispatch(setUser(data));
        }
        if (isReviewModal) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    },[body.classList, data, dispatch, isReviewModal, isSuccess, navigate, token, trigger]);

    return <>
        <Header/>
        {children}
        <Footer/>
        {isRequestLoading && <Loader/> || isRequestFetching && <Loader/>}
        {(isResponseSuccess || isResponseError) && !isRequestFetching && <Toast error={isResponseError} message={responseErrorText}/>}
        {isReviewModal && <ReviewModal/>}
    </>
};

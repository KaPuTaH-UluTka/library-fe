import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {AppPaths} from '../../types/constants/constants';
import {Loader} from '../loader/loader';
import {Toast} from '../toast/toast';
import {setUser} from "../../store/reducers/user-reducer";

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


    useEffect(() => {
        if (token) {
            trigger();
        } else {
            navigate(AppPaths.auth);
        }

        if(isSuccess){
            dispatch(setUser(data));
        }
    },[data, dispatch, isSuccess, navigate, token, trigger]);

    return <>
        <Header/>
        {children}
        <Footer/>
        {isRequestLoading && <Loader/> || isRequestFetching && <Loader/>}
        {(isResponseSuccess || isResponseError) && !isRequestFetching && <Toast error={isResponseError} message={responseErrorText}/>}
    </>
};

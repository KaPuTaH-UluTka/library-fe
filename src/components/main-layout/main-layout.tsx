import React from 'react';
import {Navigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {useAppSelector} from '../../hooks/redux';
import {AppPaths} from '../../types/constants/constants';
import {Loader} from '../loader/loader';
import {Toast} from '../toast/toast';

export const MainLayout = ({children}: { children: JSX.Element }) => {
    const {token} = useAppSelector(state => state.userReducer);

    const {
        isRequestLoading,
        isRequestFetching,
        isResponseError,
        isResponseSuccess,
        responseErrorText,
    } = useAppSelector(state => state.requestStatusReducer);

    if (!token) {
        return <Navigate to={AppPaths.auth}/>;
    }

    return <>
        <Header/>
        {children}
        <Footer/>
        {isRequestLoading && <Loader/> || isRequestFetching && <Loader/>}
        {(isResponseSuccess || isResponseError) && !isRequestFetching && <Toast error={isResponseError} message={responseErrorText}/>}
    </>
};

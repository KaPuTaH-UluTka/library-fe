import React from 'react';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {Loader} from '../loader/loader';
import {ReviewModal} from '../review-modal/review-modal';
import {Toast} from '../toast/toast';

import {useMainLayout} from './use-main-layout';

export const MainLayout = ({children}: { children: JSX.Element }) => {
    const {isRequestLoading,isRequestFetching,isResponseSuccess,isResponseError,responseErrorText,isReviewModal} = useMainLayout();

    return <>
        <Header/>
        {children}
        <Footer/>
        {isRequestLoading && <Loader/> || isRequestFetching && <Loader/>}
        {(isResponseSuccess || isResponseError) && !isRequestFetching && <Toast error={isResponseError} message={responseErrorText}/>}
        {isReviewModal && <ReviewModal/>}
    </>
};

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {setUser} from '../../store/reducers/user-reducer';
import {AppPaths} from '../../types/constants/paths';

export const useMainLayout = () => {
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

    return {isRequestLoading,isRequestFetching,isResponseSuccess,isResponseError,responseErrorText,isReviewModal}
}

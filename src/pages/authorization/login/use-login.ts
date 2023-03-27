import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {useAppDispatch} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setToken, setUser} from '../../../store/reducers/user-reducer';
import {AppPaths} from '../../../types/constants/paths';
import {LoginUser} from '../../../types/user';
import {loginSchema} from '../../../validation/validation';

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginUser, {
        isLoading,
        isError,
        isSuccess,
        error,
        data: loginData
    }] = libraryApi.useLoginUserMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<LoginUser>({
        mode: 'all',
        resolver: yupResolver(loginSchema),
    })

    const submitHandler: SubmitHandler<LoginUser> = data => {
        loginUser(data);
    }

    useEffect(() => {
        if (isSuccess && loginData) {
            dispatch(setToken(loginData.jwt));
            dispatch(setUser(loginData.user));
            navigate(AppPaths.booksAll);
        }
    }, [isSuccess, loginData, dispatch, navigate]);

    return {isError, error, handleSubmit, submitHandler, register, errors, watch, isLoading}
}

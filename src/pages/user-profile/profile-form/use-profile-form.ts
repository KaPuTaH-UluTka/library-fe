import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {libraryApi} from '../../../store/api/library-api';
import {
    setLoadingFalse,
    setLoadingTrue,
    setUserUpdateResponseErrorTrue,
    setUserUpdateResponseSuccessTrue
} from '../../../store/reducers/request-status-reducer';
import {UserProfile} from '../../../types/user';
import {
    editUserProfileSchema,
    loginProfileSchema,
    passwordSchema
} from '../../../validation/validation';

export const useProfileForm = () => {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const [isInputsDisabled, setIsInputsDisabled] = useState(true);

    const {register, formState: {errors}, handleSubmit, watch} = useForm<UserProfile>({
        mode: 'all',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        defaultValues: {
            login: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            password: 'Default1',
            phone: user?.phone,
            email: user?.email
        },
        resolver: yupResolver(editUserProfileSchema)
    });

    const [updateUser, {isSuccess, isLoading, isError}] = libraryApi.useUpdateUserMutation();

    const submitHandler = (data: UserProfile) => {
        if (user?.id) {
            updateUser({
                userId: user?.id, user: {
                    email: data.email,
                    username: data.login,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone
                }
            });
        }
    }

    const editHandler = () => {
        setIsInputsDisabled(!isInputsDisabled);
    }

    const {errorsArr: errorsUsername} = useRegistrationErrors(loginProfileSchema, watch('login'), 'login');
    const {errorsArr: errorsPassword} = useRegistrationErrors(passwordSchema, watch('password'), 'password');

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserUpdateResponseSuccessTrue());
        }
        if (isError) {
            dispatch(setUserUpdateResponseErrorTrue());
        }
        if (isLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [dispatch, isError, isLoading, isSuccess]);

    return {
        handleSubmit,
        submitHandler,
        register,
        errors,
        watch,
        errorsUsername,
        isInputsDisabled,
        errorsPassword,
        editHandler
    }
}

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {CustomButton} from '../../../components/custom-elements/button/custom-button';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {libraryApi} from '../../../store/api/library-api';
import {
    setLoadingFalse,
    setLoadingTrue, setUserUpdateResponseErrorTrue,
    setUserUpdateResponseSuccessTrue
} from '../../../store/reducers/request-status-reducer';
import {DataTestId} from '../../../types/constants/data-test-id';
import {BtnType, BtnVariant, Size} from '../../../types/custom-element';
import {UserProfile} from '../../../types/user';
import {
    editUserProfileSchema, loginProfileSchema,
    passwordSchema,
} from '../../../validation/validation';

import classes from './profile-form.module.scss';

export const ProfileForm = () => {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const [isInputsDisabled, setIsInputsDisabled] = useState(true);

    const {register, formState: {errors}, handleSubmit, watch, clearErrors} = useForm<UserProfile>({
        mode: 'all',
        defaultValues: {
            login: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
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

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={classes.profileForm}
              data-test-id={DataTestId.ProfileForm}>
            <div className={classes.rowWrapper}>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='username'
                        register={register('login', {required: true})}
                        error={errors.login}
                        placeholder='Придумайте логин для входа'
                        watchName={watch('login')}
                        type='text'
                        errors={errorsUsername}
                        isFullColorError={!!errors.login}
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='password'
                        register={register('password')}
                        error={errors.password}
                        placeholder='Пароль'
                        watchName={watch('password')}
                        type='password'
                        errors={errorsPassword}
                        isFullColorError={!!errors.password}
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                </div>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='firstName'
                        register={register('firstName')}
                        error={errors.firstName}
                        placeholder='Имя'
                        watchName={watch('firstName')}
                        type='text'
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='phone'
                        register={register('phone')}
                        messageHelper='В формате +375 (xx) xxx-xx-xx'
                        error={errors.phone}
                        placeholder='Номер телефона'
                        watchName={watch('phone')}
                        type='text'
                        mask='+375 (99) 999-99-99'
                        maskPlaceholder='x'
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                </div>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='lastName'
                        register={register('lastName')}
                        error={errors.lastName}
                        placeholder='Фамилия'
                        watchName={watch('lastName')}
                        type='text'
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='email'
                        register={register('email')}
                        error={errors.email}
                        placeholder='E-mail'
                        watchName={watch('email')}
                        type='email'
                        clearErrors={clearErrors}
                        isDisabled={isInputsDisabled}
                    />
                </div>
            </div>
            <div className={classes.btnWrapper}>
                <CustomButton type={BtnType.button} text="Редактировать" size={Size.big}
                              variant={BtnVariant.secondary} dataTestId={DataTestId.EditButton}
                              clickHandler={editHandler}/>
                <CustomButton type={BtnType.submit} text="Сохранить изменения" size={Size.big}
                              variant={BtnVariant.primary} isDisabled={isInputsDisabled}
                              dataTestId={DataTestId.SaveButton}
                              clickHandler={() => submitHandler}/>
            </div>
        </form>
    );
};

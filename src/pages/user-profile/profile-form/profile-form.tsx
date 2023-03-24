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
import {DataTestId} from '../../../types/constants/constants';
import {BtnType, BtnVariant, Size} from '../../../types/custom-element';
import {User} from '../../../types/user';
import {
    editUserProfileSchema,
    passwordSchema,
    usernameSchema
} from '../../../validation/validation';

import classes from './profile-form.module.scss';

export const ProfileForm = () => {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const [isInputsDisabled, setIsInputsDisabled] = useState(true);

    const {register, formState: {errors}, handleSubmit, watch, clearErrors} = useForm<User>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        defaultValues: {
            username: user?.username,
            password: '********',
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            email: user?.email
        },
        resolver: yupResolver(editUserProfileSchema)
    });

    const [updateUser,{isSuccess,isLoading,isError}] = libraryApi.useUpdateUserMutation();

    const submitHandler = (data: User) => {
        if (user?.id) {
            updateUser({userId: user?.id, user: data});
        }
    }

    const editHandler = () => {
        setIsInputsDisabled(false);
    }

    const {errorsArr: errorsUsername} = useRegistrationErrors(usernameSchema, watch('username'), 'username');
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
        <form onSubmit={handleSubmit(submitHandler)} className={classes.profileForm} data-test-id={DataTestId.ProfileForm}>
            <div className={classes.columnWrapper}>
            <div className={classes.column}>
                <CustomInput
                    label='username'
                    register={register('username', {required: true})}
                    error={errors.username}
                    placeholder='Придумайте логин для входа'
                    watchName={watch('username')}
                    type='text'
                    errors={errorsUsername}
                    isFullColorError={!!errors.username}
                    clearErrors={clearErrors}
                    isDisabled={isInputsDisabled}
                />
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
            <div className={classes.column}>
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
                <CustomButton type={BtnType.button} text="Редактировать" size={Size.big} variant={BtnVariant.secondary} dataTestId={DataTestId.EditButton}
                              clickHandler={editHandler}/>
                <CustomButton type={BtnType.submit} text="Сохранить изменения" size={Size.big} variant={BtnVariant.primary} isDisabled={isInputsDisabled} dataTestId={DataTestId.SaveButton}
                              clickHandler={() => submitHandler}/>
            </div>
        </form>
    );
};

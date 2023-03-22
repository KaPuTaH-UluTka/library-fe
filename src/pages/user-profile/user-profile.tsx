import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {CustomInput} from '../../components/custom-elements/input/custom-input';
import {Plug} from '../../components/plug/plug';
import {useAppSelector} from '../../hooks/redux';
import {useRegistrationErrors} from '../../hooks/use-registration-errors';
import {libraryApi} from '../../store/api/library-api';
import {PlugMessages} from '../../types/constants/constants';
import {User} from '../../types/user';
import {editUserProfileSchema, passwordSchema, usernameSchema} from '../../validation/validation';

import classes from './user-profile.module.scss';

export const UserProfile = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const {register, formState: {errors}, handleSubmit, watch, clearErrors, reset} = useForm<User>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        resolver: yupResolver(editUserProfileSchema)
    });

    const [createUser, {
        isSuccess,
        isError,
        isLoading,
    }] = libraryApi.useCreateUserMutation()

    const submitHandler = (data: User) => {
        if (!isError && !isSuccess) {
            createUser(data).catch(err => err);
        }

        if (isError) {
            reset();
        }
    }

    const {errorsArr: errorsUsername} = useRegistrationErrors(usernameSchema, watch('username'), 'username');
    const {errorsArr: errorsPassword} = useRegistrationErrors(passwordSchema, watch('password'), 'password');

    return (
        <div className={classes.profileWrapper}>
            <div className={classes.userProfile}>
            <div className={classes.userAvatarEdit}>
                <img className={classes.userAvatar} src="" alt=""/>
                <h2 className={classes.userName} >{`${user?.firstName} ${user?.lastName}`}</h2>
            </div>
            <div className={classes.userInfo}>
                <h2 className={classes.sectionTitle}>Учётные данные</h2>
                <p className={classes.sectionDescription}>Здесь вы можете отредактировать информацию
                    о себе</p>
                <form onSubmit={handleSubmit(submitHandler)}>
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
                    />
                    <CustomInput
                        label='firstName'
                        register={register('firstName')}
                        error={errors.firstName}
                        placeholder='Имя'
                        watchName={watch('firstName')}
                        type='text'
                        clearErrors={clearErrors}
                    />
                    <CustomInput
                        label='lastName'
                        register={register('lastName')}
                        error={errors.lastName}
                        placeholder='Фамилия'
                        watchName={watch('lastName')}
                        type='text'
                        clearErrors={clearErrors}
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
                    />
                    <CustomInput
                        label='email'
                        register={register('email')}
                        error={errors.email}
                        placeholder='E-mail'
                        watchName={watch('email')}
                        type='email'
                        clearErrors={clearErrors}
                    />
                </form>
            </div>
            <div className={classes.bookedBook}>
                <h2 className={classes.sectionTitle}>Забронированная книга</h2>
                <p className={classes.sectionDescription}>Здесь вы можете просмотреть
                    забронированную
                    книгу, а так же отменить бронь</p>
                <div className={classes.sectionContent}>
                <Plug error={false} title={PlugMessages.bookedBook} />
                </div>
            </div>
            <div className={classes.handledBook}>
                <h2 className={classes.sectionTitle}>Книга которую взяли</h2>
                <p className={classes.sectionDescription}>Здесь можете просмотреть информацию о
                    книге и
                    узнать сроки возврата</p>
            </div>
            <div className={classes.booksHistory}>
                <h2 className={classes.sectionTitle}>История</h2>
                <p className={classes.sectionDescription}>Список прочитанных книг</p>
            </div>
            </div>
        </div>
    )
};

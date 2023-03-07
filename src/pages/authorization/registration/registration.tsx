import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';

import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {ModalAuthLayout} from '../../../components/modal-auth-layout/modal-auth-layout';
import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {isFetchBaseQueryError} from '../../../store/api/api-helpers';
import {libraryApi} from '../../../store/api/library-api';
import {AppPaths, DataTestId} from '../../../types/constants/constants';
import {User} from '../../../types/user';
import {selectRegistrationSchema} from '../../../utils/authorization';

import {passwordSchema, usernameSchema} from '../validation';

import classes from './registration.module.scss';

export const Registration = () => {
    const [registrationStage, setRegistrationStage] = useState(1);
    const navigate = useNavigate()
    const [createUser, {isSuccess, isError, isLoading, error, reset: apiReset}] = libraryApi.useCreateUserMutation()

    const {register, formState: {errors}, handleSubmit, watch, clearErrors, reset} = useForm<User>({
        mode: 'onBlur',
        shouldFocusError: false,
        resolver: yupResolver(selectRegistrationSchema(registrationStage))
    });

    const submitHandler = (data: User) => {
        if(registrationStage < 3){
            setRegistrationStage(registrationStage + 1);
        }
        if (registrationStage === 3 && !isError && !isSuccess) {
            createUser(data);
        }
        if (isSuccess) {
            navigate(AppPaths.auth)
        }
        if (isError) {
            reset();
            apiReset();
            setRegistrationStage(1);
        }
    }

    const {errorsArr: errorsUsername} = useRegistrationErrors(usernameSchema, watch('username'), 'username');
    const {errorsArr: errorsPassword} = useRegistrationErrors(passwordSchema, watch('password'), 'password');

    console.log(errors, !!errors.username);

    return (<>
            {isSuccess && (
                <ModalAuthLayout>
                    <h2 className={classes.modalTitle}>Регистрация успешна</h2>
                    <p className={classes.modalMessage}>
                        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и
                        пароль
                    </p>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <button type="submit"
                                className={classes.submitBtn}>
                            Вход
                        </button>
                    </form>
                </ModalAuthLayout>
            )}
            {isError && (
                <ModalAuthLayout>
                    <h2 className={classes.modalTitle}>Данные не сохранились</h2>
                    <p className={classes.modalMessage}>
                        {isFetchBaseQueryError(error) && error.status === 400 ? 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.' : 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'}
                    </p>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <button type="submit"
                                className={classes.submitBtn}>
                            {isFetchBaseQueryError(error) && error.status === 400 ? 'Назад к регистрации' : 'Повторить'}

                        </button>
                    </form>
                </ModalAuthLayout>
            )}
            {!isError && !isSuccess && (<div className={classes.registration}>
                <h2 className={classes.registrationTitle}>Регистрация</h2>
                <p className={classes.registrationCounter}>{`${registrationStage} шаг из 3`}</p>
                <form className={classes.registrationForm}
                      onSubmit={handleSubmit(submitHandler)} data-test-id={DataTestId.RegisterForm}>
                    {registrationStage === 1 && <>
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
                    </>}
                    {registrationStage === 2 && <>
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
                        /></>}
                    {registrationStage === 3 && <>
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
                        /></>}
                    <button type="submit"
                            className={classes.submitBtn}>
                        {registrationStage === 1 && 'Следующий шаг'}
                        {registrationStage === 2 && 'Последний шаг'}
                        {registrationStage === 3 && 'Зарегистрироваться'}
                    </button>
                </form>
                <p className={classes.accountExist}>Есть учётная запись? <Link
                    className={classes.loginLink} to={AppPaths.auth}>Войти</Link>
                </p>
            </div>)}
            {isLoading && <Loader/>}
        </>
    );
};

import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';

import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {useAppDispatch} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setToken, setUser} from '../../../store/reducers/user-reducer';
import {AppPaths, DataTestId} from '../../../types/constants/constants';
import {LoginUser} from '../../../types/user';
import {loginSchema} from '../validation';

import classes from './login.module.scss';

export const Login = () => {

    const dispatch = useAppDispatch();

    const [loginUser, {isLoading, isError, reset: apiReset}] = libraryApi.useLoginUserMutation();

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
        const user = loginUser(data).unwrap();
        user.then(userData => {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', userData.jwt);
            dispatch(setUser(userData));
            dispatch(setToken(userData.jwt));
        });

    }

    return (<>
            {!isError && <div className={classes.loginWrapper}>
                <div className={classes.login}>
                    <h2 className={classes.loginTitle}>Вход в личный кабинет</h2>
                    <form className={classes.loginForm} onSubmit={handleSubmit(submitHandler)}
                          data-test-id={DataTestId.AuthForm}>
                        <CustomInput
                            label='identifier'
                            register={register('identifier')}
                            error={errors.identifier}
                            placeholder='Логин'
                            watchName={watch('identifier')}
                            type='text'
                            withoutErrorMessage={!errors.identifier}
                        />
                        <CustomInput
                            label='password'
                            register={register('password')}
                            error={errors.password}
                            placeholder='Пароль'
                            watchName={watch('password')}
                            type='password'
                            withoutErrorMessage={!errors.password}
                        />
                        <Link className={classes.forgotLink} to={AppPaths.forgotPass}>Забыли логин
                            или пароль?</Link>
                        <button type="submit" className={classes.submitBtn}>Войти</button>
                    </form>
                    <p className={classes.accountNotExist}>Нет учётной записи? <Link
                        className={classes.registrationLink}
                        to={AppPaths.registration}>Регистрация</Link></p>
                </div>
            </div>}
            {isLoading && <Loader/>}</>
    );
};

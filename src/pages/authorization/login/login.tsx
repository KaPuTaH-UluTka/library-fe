import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';

import RightArrow from '../../../assets/auth-icons/arrowRight.svg'
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {ModalAuthLayout} from '../../../components/modal-auth-layout/modal-auth-layout';
import {useAppDispatch} from '../../../hooks/redux';
import {isFetchBaseQueryError} from '../../../store/api/api-helpers';
import {libraryApi} from '../../../store/api/library-api';
import {setToken, setUser} from '../../../store/reducers/user-reducer';
import {AppPaths, DataTestId, LoginResponseErrors} from '../../../types/constants/constants';
import {LoginUser} from '../../../types/user';
import {loginSchema} from '../validation';

import classes from './login.module.scss';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginUser, {
        isLoading,
        isError,
        error,
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
            const user = loginUser(data).unwrap();

                user.then(userData => {
                    dispatch(setUser(userData.user));
                    dispatch(setToken(userData.jwt));
                    navigate(AppPaths.booksAll);
                }).catch(err => err);

    }

    return (<>
            {(!localStorage.getItem('user') && !isError || isFetchBaseQueryError(error) && error.status === 400) &&
                <div className={classes.loginWrapper}>
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
                            <p
                                className={classNames(classes.errorMessage, {
                                    [classes.visibleError]: isFetchBaseQueryError(error) && error.status === 400,
                                })}
                                data-test-id={DataTestId.Hint}
                            >
                                {LoginResponseErrors.incorrectLoginOrPassword}
                            </p>
                            <Link className={classes.forgotLink} to={AppPaths.forgotPass}>
                                {isFetchBaseQueryError(error) && error.status === 400 ? 'Восстановить?' :
                                    'Забыли логин или пароль?'}</Link>
                            <button type="submit" className={classes.submitBtn}>Вход</button>
                        </form>
                        <p className={classes.accountNotExist}>Нет учётной записи? <Link
                            className={classes.registrationLink}
                            to={AppPaths.registration}>Регистрация <img src={RightArrow}
                                                                        alt='rightArrow'/></Link>
                        </p>
                    </div>
                </div>}
            {isError && isFetchBaseQueryError(error) && error.status !== 400 && (
                <ModalAuthLayout>
                    <h2 className={classes.modalTitle}>Вход не выполнен</h2>
                    <p className={classes.modalMessage}>
                        {LoginResponseErrors.smthWrong}
                    </p>
                    <form className={classes.loginForm} onSubmit={handleSubmit(submitHandler)}>
                        <button type="submit"
                                className={classes.submitBtn}>
                            Повторить
                        </button>
                    </form>
                </ModalAuthLayout>
            )}
            {isLoading && <Loader/>}</>
    );
};

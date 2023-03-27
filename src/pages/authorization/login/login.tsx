import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import RightArrow from '../../../assets/auth-icons/arrowRight.svg'
import {AuthModalLayout} from '../../../components/auth-modal-layout/auth-modal-layout';
import {CustomButton} from '../../../components/custom-elements/button/custom-button';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {isFetchBaseQueryError} from '../../../store/api/api-helpers';
import {DataTestId} from '../../../types/constants/data-test-id';
import {LoginResponseErrors} from '../../../types/constants/messages';
import {AppPaths} from '../../../types/constants/paths';
import {BtnType, Size} from '../../../types/custom-element';

import {useLogin} from './use-login';

import classes from './login.module.scss';

export const Login = () => {
    const {
        isError,
        error,
        handleSubmit,
        submitHandler,
        register,
        errors,
        watch,
        isLoading
    } = useLogin();

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
                                responseError={!!error}
                            />
                            <CustomInput
                                label='password'
                                register={register('password')}
                                error={errors.password}
                                placeholder='Пароль'
                                watchName={watch('password')}
                                type='password'
                                withoutErrorMessage={!errors.password}
                                responseError={!!error}
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
                            <div className={classes.btnWrapper}><CustomButton type={BtnType.submit}
                                                                              text='Вход'
                                                                              clickHandler={() => submitHandler}
                                                                              size={Size.big}/>
                            </div>

                        </form>
                        <p className={classes.accountNotExist}>Нет учётной записи? <Link
                            className={classes.registrationLink}
                            to={AppPaths.registration}>Регистрация <img src={RightArrow}
                                                                        alt='rightArrow'/></Link>
                        </p>
                    </div>
                </div>}
            {isError && isFetchBaseQueryError(error) && error.status !== 400 && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Вход не выполнен</h2>
                    <p className={classes.modalMessage}>
                        {LoginResponseErrors.smthWrong}
                    </p>
                    <form className={classes.loginForm} onSubmit={handleSubmit(submitHandler)}>
                        <CustomButton type={BtnType.submit} text='Повторить'
                                      clickHandler={() => submitHandler} size={Size.big}/>
                    </form>
                </AuthModalLayout>
            )}
            {isLoading && <Loader/>}</>
    );
};

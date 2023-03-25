import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';

import LeftArrow from '../../../assets/auth-icons/arrowLeft.svg';
import RightArrow from '../../../assets/auth-icons/arrowRight.svg';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {AuthModalLayout} from '../../../components/auth-modal-layout/auth-modal-layout';
import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {libraryApi} from '../../../store/api/library-api';
import {AppPaths, DataTestId, ForgotErrorMessages,} from '../../../types/constants/constants';
import {ForgotPasswordFields} from '../../../types/user';
import {forgotPasswordSchema, resetPasswordSchema} from '../../../validation/validation';

import classes from './forgot-pass.module.scss';
import {CustomButton} from "../../../components/custom-elements/button/custom-button";
import {BtnType, Size} from "../../../types/custom-element";

export const ForgotPass = () => {
    const navigate = useNavigate();
    const {search} = useLocation();
    const code = search.split('=')[1];

    const [forgotPassRequest, {
        isLoading: isForgotLoading,
        isSuccess: isForgotSuccess,
        error: forgotError
    }] = libraryApi.useForgotPasswordMutation();

    const [resetPassRequest, {
        isLoading: isResetLoading,
        isError: isResetError,
        isSuccess: isResetSuccess,
    }] = libraryApi.useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        clearErrors,
    } = useForm<ForgotPasswordFields>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(code ? resetPasswordSchema : forgotPasswordSchema),
        shouldFocusError: false,
    })

    const submitHandler: SubmitHandler<ForgotPasswordFields> = data => {
        if (code) {
            resetPassRequest({
                code,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
            }).catch(err => err);
        }
        if (isResetError && code) {
            resetPassRequest({
                code,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
            }).catch(err => err);
        }
        if (!code) {
            forgotPassRequest({email: data.email}).catch(err => err);
        }
    }

    const {errorsArr} = useRegistrationErrors(resetPasswordSchema, watch('password'), 'password')

    return (<>
            {!isForgotSuccess && !code && <div className={classes.forgotWrapper}>
                <div className={classes.forgot}>
                    <div className={classes.loginNav}>
                        <Link className={classes.loginLink} to={AppPaths.auth}>
                            <img src={LeftArrow} alt='leftArrow'/>
                            Вход в личный кабинет
                        </Link>
                    </div>
                    <h2 className={classNames(classes.forgotTitle, classes.activeNav)}>Восстановление
                        пароля</h2>
                    <form className={classes.forgotForm} onSubmit={handleSubmit(submitHandler)}
                          data-test-id={DataTestId.SendEmailForm}>
                        <CustomInput
                            label='email'
                            register={register('email')}
                            error={errors.email}
                            placeholder='Email'
                            watchName={watch('email')}
                            type='email'
                            clearErrors={clearErrors}
                        />
                        {forgotError && (
                            <p className={classes.hintError} data-test-id={DataTestId.Hint}>
                                error
                            </p>
                        )}
                        <p className={classes.hint}>
                            На это email будет отправлено письмо с инструкциями по восстановлению
                            пароля
                        </p>
                        <div className={classes.btnWrapper}>
                            <CustomButton type={BtnType.submit} text='Восстановить'
                                          clickHandler={() => submitHandler} size={Size.big}/>
                        </div>
                    </form>
                    <p className={classes.accountNotExist}>Нет учётной записи? <Link
                        className={classes.registrationLink}
                        to={AppPaths.registration}>Регистрация <img src={RightArrow}
                                                                    alt='rightArrow'/></Link></p>
                </div>
            </div>}
            {!isResetSuccess && !isResetError && code && <div className={classes.forgotWrapper}>
                <div className={classes.forgot}>
                    <h1 className={classes.forgotTitle}>Восстановление пароля</h1>
                    <form className={classes.forgotForm} onSubmit={handleSubmit(submitHandler)}
                          data-test-id={DataTestId.ResetPasswordForm}>
                        <CustomInput
                            label='password'
                            register={register('password')}
                            error={errors.password}
                            placeholder='Новый пароль'
                            watchName={watch('password')}
                            type='password'
                            errors={errorsArr}
                            clearErrors={clearErrors}
                        />
                        <CustomInput
                            label='passwordConfirmation'
                            register={register('passwordConfirmation')}
                            error={errors.passwordConfirmation}
                            placeholder='Повторите пароль'
                            watchName={watch('passwordConfirmation')}
                            type='password'
                            clearErrors={clearErrors}
                        />
                        <div className={classes.btnWrapper}>
                            <CustomButton type={BtnType.submit} text='Сохранить изменения'
                                          clickHandler={() => submitHandler}
                                          isDisabled={!!errors.passwordConfirmation}
                                          size={Size.big}/>
                        </div>
                    </form>
                    <p className={classes.info}>
                        После сохранения войдите в библиотеку, используя новый пароль
                    </p></div>
            </div>}
            {isForgotSuccess && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Письмо выслано</h2>
                    <p className={classes.modalMessage}>
                        Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению
                        пароля
                    </p>
                </AuthModalLayout>
            )}
            {isResetSuccess && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Новые данные
                        сохранены</h2>
                    <p className={classes.modalMessage}>
                        Зайдите в личный кабинет, используя свои логин и новый пароль
                    </p>
                    <div className={classes.btnWrapper}>
                        <CustomButton type={BtnType.button} text='Вход'
                                      clickHandler={() => navigate(AppPaths.auth)} size={Size.big}/>
                    </div>
                </AuthModalLayout>
            )}
            {isResetError && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Данные не
                        сохранились</h2>
                    <p className={classes.modalMessage}>
                        {ForgotErrorMessages.smthWrong}
                    </p>
                    <form className={classes.forgotForm} onSubmit={handleSubmit(submitHandler)}>
                        <div className={classes.btnWrapper}>
                            <CustomButton type={BtnType.submit} text='Повторить'
                                          clickHandler={() => submitHandler} size={Size.big}/>
                        </div>
                    </form>
                </AuthModalLayout>
            )}
            {(isForgotLoading || isResetLoading) && <Loader/>}
        </>
    );
};

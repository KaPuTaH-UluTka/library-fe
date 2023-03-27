import React from 'react';
import {Link} from 'react-router-dom';

import RightArrow from '../../../assets/auth-icons/arrowRight.svg'
import {AuthModalLayout} from '../../../components/auth-modal-layout/auth-modal-layout';
import {CustomButton} from '../../../components/custom-elements/button/custom-button';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {Loader} from '../../../components/loader/loader';
import {isFetchBaseQueryError} from '../../../store/api/api-helpers';
import {DataTestId} from '../../../types/constants/data-test-id';
import {RegistrationResponseErrors} from '../../../types/constants/messages';
import {AppPaths} from '../../../types/constants/paths';
import {BtnType, Size} from '../../../types/custom-element';
import {registrationBtnText} from '../../../utils/btn-text';

import {useRegistration} from './use-registration';

import classes from './registration.module.scss';

export const Registration = () => {
    const {
        isSuccess,
        handleSubmit,
        submitHandler,
        error,
        isError,
        register,
        registrationStage,
        errors,
        watch,
        errorsUsername,
        clearErrors,
        errorsPassword,
        isLoading
    } = useRegistration();

    return (<>
            {isSuccess && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Регистрация успешна</h2>
                    <p className={classes.modalMessage}>
                        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и
                        пароль
                    </p>
                    <form className={classes.registrationForm}
                          onSubmit={handleSubmit(submitHandler)}>
                        <div className={classes.btnWrapper}>
                            <CustomButton type={BtnType.submit} text='Вход'
                                          clickHandler={() => submitHandler} size={Size.big}/>
                        </div>
                    </form>
                </AuthModalLayout>
            )}
            {isError && (
                <AuthModalLayout>
                    <h2 className={classes.modalTitle}>Данные не сохранились</h2>
                    <p className={classes.modalMessage}>
                        {isFetchBaseQueryError(error) && error.status === 400 ? RegistrationResponseErrors.userExist : RegistrationResponseErrors.smthWrong}
                    </p>
                    <form className={classes.registrationForm}
                          onSubmit={handleSubmit(submitHandler)}>
                        <button type="submit"
                                className={classes.submitBtn}>
                            {isFetchBaseQueryError(error) && error.status === 400 ? 'Назад к регистрации' : 'Повторить'}

                        </button>
                        <div className={classes.btnWrapper}>
                            <CustomButton type={BtnType.submit}
                                          text={isFetchBaseQueryError(error) && error.status === 400 ? 'Назад к регистрации' : 'Повторить'}
                                          clickHandler={() => submitHandler} size={Size.big}/>
                        </div>
                    </form>
                </AuthModalLayout>
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
                    <div className={classes.btnWrapper}>
                        <CustomButton type={BtnType.submit} isDisabled={!!errors.username ||
                            !!errors.password ||
                            !!errors.firstName ||
                            !!errors.lastName ||
                            !!errors.phone ||
                            !!errors.email} text={registrationBtnText(registrationStage)}
                                      clickHandler={() => submitHandler} size={Size.big}/>
                    </div>
                </form>
                <p className={classes.accountExist}>Есть учётная запись?<Link
                    className={classes.loginLink} to={AppPaths.auth}>Войти<img src={RightArrow}
                                                                               alt='rightArrow'/></Link>
                </p>
            </div>)}
            {isLoading && <Loader/>}
        </>
    );
};

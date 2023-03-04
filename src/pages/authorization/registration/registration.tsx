import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';

import {AppPaths} from '../../../types/constants/constants';
import {User} from '../../../types/user';

import {passwordSchema, stageOneSchema, usernameSchema} from './validation';

import classes from './registration.module.scss';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {useRegistrationErrors} from '../../../hooks/use-registration-errors';

export const Registration = () => {
    const [stageOne, setStageOne] = useState(true);
    const [stageTwo, setStageTwo] = useState(false);
    const [stageThree, setStageThree] = useState(false);
    const [stageCounter, setStageCounter] = useState(1);

    const {register, formState: {errors}, handleSubmit, watch, clearErrors,} = useForm<User>({
        defaultValues: {
            'email': '',
            'username': '',
            'password': '',
            'firstName': '',
            'lastName': '',
            'phone': ''
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        resolver: yupResolver(stageOneSchema)
    });

    const toSecondStage = () => {
        setStageOne(false);
        setStageTwo(true);
        setStageCounter(stageCounter + 1);
    }

    const toThirdStage = () => {
        setStageTwo(false);
        setStageThree(true);
        setStageCounter(stageCounter + 1);
    }

    const registration = (data: User) => {
        if(stageThree){
            console.log('register');
        }
        console.log(data);
    }

    const { errorsArr: errorsUsername } = useRegistrationErrors(usernameSchema, watch('username'), 'username');
    const { errorsArr: errorsPassword } = useRegistrationErrors(passwordSchema, watch('password'), 'password');

    return (
        <div className={classes.registrationWrapper}>
            <div className={classes.registration}>
                <h2 className={classes.registrationTitle}>Регистрация</h2>
                <p className={classes.registrationCounter}>{`${stageCounter} шаг из 3`}</p>
                <form className={classes.registrationForm}
                      onSubmit={handleSubmit(registration)}>
                    {stageOne && <>
                        <CustomInput
                            label='username'
                            register={register('username')}
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
                    {stageTwo && <><input id="firstName" placeholder=" " {...register('firstName', {
                        required: true,
                        minLength: {value: 1, message: 'Поле не может быть пустым'},
                    })}
                                          className={classNames(classes['registration-form-input'], classes['registration-form-name'])}
                                          type="text"/>
                        <label htmlFor="firstName"
                               className={classes['registration-form-input-label']}>Имя</label>
                        {errors.firstName?.message && <p role="alert"
                                                         className={classes['registration-form-error']}>{errors.firstName?.message}</p>}
                        <input id="lastName" placeholder=" " {...register('lastName', {
                            required: true,
                            minLength: {value: 1, message: 'Поле не может быть пустым'}
                        })}
                               className={classNames(classes['registration-form-input'], classes['registration-form-surname'])}
                               type="text"/>
                        <label htmlFor="lastName"
                               className={classNames(classes['registration-form-input-label'], classes['label-surname'])}>Фамилия</label>
                        {errors.lastName?.message && <p role="alert"
                                                        className={classes['registration-form-error']}>{errors.lastName?.message}</p>}</>}
                    {stageThree && <><input id="phone" placeholder=" "
                                            className={classNames(classes['registration-form-input'], classes['registration-form-phone'])}
                                            type="tel"/>
                        <label htmlFor="phone" className={classes['registration-form-input-label']}>Номер
                            телефона</label>
                        <input id="email" placeholder=" "
                               className={classNames(classes['registration-form-input'], classes['registration-form-mail'])}
                               type="email"/>
                        <label htmlFor="email"
                               className={classes['registration-form-input-label']}>E-mail</label></>}
                    {stageOne && <button type="button" className={classes.submitBtn}
                                         onClick={toSecondStage}>Следующий шаг</button>}
                    {stageTwo && <button type="button" className={classes.submitBtn}
                                         onClick={toThirdStage}>Последний шаг</button>}
                    {stageThree &&
                        <button type="submit" className={classes.submitBtn}>Зарегистрироваться</button>}
                </form>
                <p className={classes.accountExist}>Есть учётная запись? <Link
                    className={classes.loginLink} to={AppPaths.auth}>Войти</Link>
                </p>
            </div>
        </div>
    );
};

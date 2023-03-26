import React, {useState} from 'react';
import {FieldError, UseFormClearErrors, UseFormRegisterReturn} from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import CloseEye from '../../../assets/auth-icons/EyeClosed.svg';
import OpenEye from '../../../assets/auth-icons/EyeOpen.svg';
import PassCheck from '../../../assets/auth-icons/pass-check.svg';
import {DataTestId} from '../../../types/constants/data-test-id';

import {HintHighlight} from './hint-highlight/hint-highlight';

import classes from './custom-input.module.scss';

type CustomInputProps = {
    label: string;
    register: UseFormRegisterReturn;
    placeholder: string;
    watchName: string;
    messageHelper?: string;
    error?: FieldError;
    type: string;
    withoutErrorMessage?: boolean;
    mask?: string;
    maskPlaceholder?: string;
    errors?: string[];
    isFullColorError?: boolean;
    clearErrors?: UseFormClearErrors<any>;
    isDisabled?: boolean;
    fromProfile?: boolean;
}

export const CustomInput = ({
                                label,
                                register,
                                placeholder,
                                watchName,
                                messageHelper,
                                error,
                                withoutErrorMessage = false,
                                type,
                                mask,
                                maskPlaceholder,
                                errors,
                                isFullColorError,
                                clearErrors,
    isDisabled, fromProfile
                            }: CustomInputProps) => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const [isOnFocus, setIsOnFocus] = useState(false);

    const changeIsOpenEye = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsOpenEye(!isOpenEye)
    }

    const isWithoutErrorsAndInputDontPhone =
        !messageHelper && !errors && error?.message && label !== 'phone';

    const isWithErrorsAndErrorTypeRequired =
        !messageHelper && errors && error?.message && error.type === 'required' && label !== 'phone';

    const isPassword = !error?.message && !errors?.length && watchName && label === 'password';

    const isPasswordOrConfirmPassword =
        watchName && (label === 'password' || label === 'passwordConfirmation');

    const focusHandler = () => {
        if (clearErrors) clearErrors();
        setIsOnFocus(true);
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement> ) => {
        setIsOnFocus(false);
        register.onBlur(e);
    }

    return (<div className={classNames(classes.inputWrapper)}> {mask ? (
        <InputMask
            className={classNames(classes.input, {[classes.inputError]: error?.message})}
            type={isOpenEye ? 'text' : type}
            maskChar={maskPlaceholder}
            mask={mask}
            {...register}
            alwaysShowMask={fromProfile ? fromProfile : !error?.message && !watchName && label !== 'phone'}
            onFocus={focusHandler}
            onBlur={blurHandler}
            disabled={isDisabled ? isDisabled : false}
        />
    ) : (
        <input
            className={classNames(classes.input, {[classes.inputError]: error?.message})}
            {...register}
            type={isOpenEye ? 'text' : type}
            onFocus={focusHandler}
            onBlur={blurHandler}
            disabled={isDisabled ? isDisabled : false}
        />
    )}
        <label
            className={classNames(classes.placeholder, {[classes.focus]: isOnFocus || watchName})}>{placeholder}</label>
        {errors && error?.type !== 'required' && (
            <HintHighlight
                errors={errors}
                dataTestId={DataTestId.Hint}
                hintType={label}
                isShowError={!!watchName}
                isFullColorError={isFullColorError}
            />
        )}
        {isWithErrorsAndErrorTypeRequired && (
            <p
                className={classNames(classes.error, {
                    [classes.visibleError]: error,
                    [classes.hideError]: withoutErrorMessage,
                })}
                data-test-id={DataTestId.Hint}
            >
                {error?.message}
            </p>
        )}
        {label === 'phone' && (
            <p
                className={classNames(classes.errorPhone, {
                    [classes.active]: error?.message,
                    [classes.hideError]: withoutErrorMessage,
                })}
                data-test-id={DataTestId.Hint}
            >
                {error?.message ? error.message : messageHelper}
            </p>
        )}
        {isWithoutErrorsAndInputDontPhone && (
            <p
                className={classNames(classes.error, {
                    [classes.visibleError]: error?.message,
                    [classes.hideError]: withoutErrorMessage,
                })}
                data-test-id={DataTestId.Hint}
            >
                {error?.message}
            </p>
        )}
        {isPassword && (
            <img
                className={classes.checkPassImg}
                src={PassCheck}
                alt='check'
                data-test-id={DataTestId.CheckMark}
            />
        )}
        {isPasswordOrConfirmPassword && (
            <img
                src={isOpenEye ? OpenEye : CloseEye}
                className={classes.eyeImg}
                alt='eye'
                onClick={changeIsOpenEye}
                role='presentation'
                data-test-id={isOpenEye ? DataTestId.EyeOpened : DataTestId.EyeClosed}
            />
        )}</div>)
}

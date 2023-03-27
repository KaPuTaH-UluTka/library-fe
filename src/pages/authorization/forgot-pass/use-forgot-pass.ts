import {SubmitHandler, useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {libraryApi} from '../../../store/api/library-api';
import {ForgotPasswordFields} from '../../../types/user';
import {forgotPasswordSchema, resetPasswordSchema} from '../../../validation/validation';

export const useForgotPass = () => {
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

    const {errorsArr} = useRegistrationErrors(resetPasswordSchema, watch('password'), 'password');

    return {isForgotSuccess,code,handleSubmit,submitHandler,register, errors, watch, clearErrors, forgotError, isResetSuccess, isResetError, errorsArr, navigate, isForgotLoading, isResetLoading}
}

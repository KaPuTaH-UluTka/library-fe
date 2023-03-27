import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {useRegistrationErrors} from '../../../hooks/use-registration-errors';
import {libraryApi} from '../../../store/api/library-api';
import {AppPaths} from '../../../types/constants/paths';
import {User} from '../../../types/user';
import {selectRegistrationSchema} from '../../../utils/authorization';
import {passwordSchema, usernameSchema} from '../../../validation/validation';

export const useRegistration = () => {
    const [registrationStage, setRegistrationStage] = useState(1);
    const navigate = useNavigate();
    const [createUser, {
        isSuccess,
        isError,
        isLoading,
        error,
        reset: apiReset
    }] = libraryApi.useCreateUserMutation();

    const {register, formState: {errors}, handleSubmit, watch, clearErrors, reset} = useForm<User>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        resolver: yupResolver(selectRegistrationSchema(registrationStage))
    });

    const submitHandler = (data: User) => {
        if (registrationStage < 3) {
            setRegistrationStage(registrationStage + 1);
        }
        if (registrationStage === 3 && !isError && !isSuccess) {
            createUser(data).catch(err => err);
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

    return {
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
    }
}

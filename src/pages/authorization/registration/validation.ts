import * as yup from 'yup';

import {RegistrationErrorMessages} from '../../../types/constants/constants';

export const Regex = {
    loginLetter: /(?=.*[a-zA-Z]).+/,
    loginNumber: /(?=.*\d).+/,
    passwordBase: /(?=.*[a-zA-Z0-9]{6,})/,
    passwordUpperLetter: /(?=.*[A-Z])/,
    passwordOneNum: /(?=.*[0-9])/,
}

export const stageOneSchema = yup.object().shape({
    username: yup
        .string()
        .required('required')
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
    password: yup
        .string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter,   RegistrationErrorMessages.withUpperLetter )
        .matches(Regex.passwordOneNum,  RegistrationErrorMessages.withNumber ),
});

export const usernameSchema = yup.object().shape({
    username:  yup
        .string()
        .required('required')
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
})

export const passwordSchema = yup.object().shape({
    password: yup
        .string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter,   RegistrationErrorMessages.withUpperLetter )
        .matches(Regex.passwordOneNum,  RegistrationErrorMessages.withNumber ),
})

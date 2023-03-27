import {lazy, object, ref, string} from 'yup';

import {RegistrationErrorMessages} from '../types/constants/messages';

export const Regex = {
    loginLetter: /(?=.*[a-zA-Z]).+/,
    loginNumber: /(?=.*\d).+/,
    passwordBase: /(?=.*[a-zA-Z0-9]{6,})/,
    passwordUpperLetter: /(?=.*[A-Z])/,
    passwordOneNum: /(?=.*[0-9])/,
    phone:
        /^\+?375((\s\(25\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2}))\s*$/,
    email:
        /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
}

export const registrationStageOneSchema = object({
    username: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
    password: string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter,   RegistrationErrorMessages.withUpperLetter )
        .matches(Regex.passwordOneNum,  RegistrationErrorMessages.withNumber ),
});

export const registrationStageTwoSchema = object({
    firstName: string().required(RegistrationErrorMessages.required),
    lastName: string().required(RegistrationErrorMessages.required),
});

export const registrationStageThreeSchema = object({
    phone: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.phone, RegistrationErrorMessages.phone),
    email: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.email, RegistrationErrorMessages.email),
});

export const editUserProfileSchema = object({
    login: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
    password: string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter,   RegistrationErrorMessages.withUpperLetter )
        .matches(Regex.passwordOneNum,  RegistrationErrorMessages.withNumber ),
    firstName: string().required(RegistrationErrorMessages.required),
    lastName: string().required(RegistrationErrorMessages.required),
    phone: string()
        .matches(Regex.phone, RegistrationErrorMessages.phone),
    email: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.email, RegistrationErrorMessages.email),
});


export const usernameSchema = object({
    username: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
})

export const loginProfileSchema = object({
    login: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.loginLetter, RegistrationErrorMessages.latinAlphabet)
        .matches(Regex.loginNumber, RegistrationErrorMessages.numbers),
})

export const passwordSchema = object({
    password: string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter,   RegistrationErrorMessages.withUpperLetter )
        .matches(Regex.passwordOneNum,  RegistrationErrorMessages.withNumber ),
})

export const loginSchema = object({
    identifier: string().required(RegistrationErrorMessages.required),
    password: string().required(RegistrationErrorMessages.required),
})

export const forgotPasswordSchema = object({
    email: string()
        .required(RegistrationErrorMessages.required)
        .matches(Regex.email, RegistrationErrorMessages.email),
})

export const resetPasswordSchema = object({
    password: string()
        .required(RegistrationErrorMessages.required)
        .min(8, RegistrationErrorMessages.atLeastEightCharacters)
        .matches(Regex.passwordUpperLetter, { message: RegistrationErrorMessages.withUpperLetter })
        .matches(Regex.passwordOneNum, { message: RegistrationErrorMessages.withNumber }),
    passwordConfirmation: lazy(value =>
        string().when('passwordConfirmation', (_, schema) =>
            value === ''
                ? schema.required(RegistrationErrorMessages.required)
                : schema.oneOf([ref('password')], 'Пароли не совпадают')
        )
    ),
})

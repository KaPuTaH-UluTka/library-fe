export interface User {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

export interface RegisteredUser {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

export interface LoginUser {
    identifier: string,
    password: string,
}

export interface ResetUser {
    password: string,
    passwordConfirmation: string,
    code: string
}


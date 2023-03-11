export interface User {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

export interface RegisteredUser {
        id: number
        username: string
        email: string
        provider: string
        confirmed: boolean
        blocked: false
        createdAt: string
        updatedAt: string
        firstName: string
        lastName: string
        phone: string

}

export interface AuthResponse {
    jwt: string,
    user: RegisteredUser
}

export interface LoginUser {
    identifier: string,
    password: string,
}

export interface ForgotPassword {
    email: string
}

export interface ResetPassword {
    password: string,
    passwordConfirmation: string,
    code: string
}

export interface ForgotPasswordFields {
    password: string,
    passwordConfirmation: string,
    email: string
}

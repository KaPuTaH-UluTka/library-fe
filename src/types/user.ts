import {UserBook} from './book';

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
    role: {
        id: number,
        name: string,
        description: string,
        type: string
    },
    comments: [
        {
            id: number,
            rating: number,
            text: string | null,
            bookId: number
        }
    ],
    avatar: string,
    booking: {
        id: number,
        order: boolean,
        dateOrder: string,
        book: UserBook
    },
    delivery: {
        id: number,
        handed: boolean,
        dateHandedFrom: string,
        dateHandedTo: string,
        book: UserBook
    },
    history: {
        id: 3,
        books: UserBook[]
    }
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
